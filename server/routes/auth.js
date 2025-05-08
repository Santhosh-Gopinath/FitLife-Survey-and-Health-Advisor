const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log('Registering attempt:', {email, firstName, lastName});

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      console.log('User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      email,
      password,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to MongoDB
    try {
      await user.save();
      console.log('User saved to MongoDB:');
    } catch (mongoErr) {
      console.error('MongoDB save error:', mongoErr.message);
      return res.status(500).json({ msg: 'Error saving user to database' });
    }


    // Update local db.json
    try {
      const dbJsonPath = path.join(__dirname, '../../db.json');
      let dbJson = { users: [] };
    
      if (fs.existsSync(dbJsonPath)) {
        const data = fs.readFileSync(dbJsonPath);
        dbJson = JSON.parse(data);
      }
    
      dbJson.users.push({
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName
      });
    
      fs.writeFileSync(dbJsonPath, JSON.stringify(dbJson, null, 2));
      console.log('User saved to db.json');
    } catch (fileErr) {
      console.error('Error saving to db.json:', fileErr);
    }

    // Return JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) {
          console.error('JWT sign error:', err);  
          throw err;
        }
        console.log('JWT token generated successfully');
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', {email});

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Return JWT
    const tokenPayload = {  // Changed from payload to tokenPayload
      user: {
        id: user.id
      }
    };

    jwt.sign(
      tokenPayload,  // Using tokenPayload instead of payload
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        console.log('Login successful');
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Update user with reset token
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Update db.json
    const dbJsonPath = path.join(__dirname, '../../db.json');
    const dbJson = JSON.parse(fs.readFileSync(dbJsonPath));
    
    const userIndex = dbJson.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      dbJson.users[userIndex].resetToken = resetToken;
      dbJson.users[userIndex].resetTokenExpiry = resetTokenExpiry;
      fs.writeFileSync(dbJsonPath, JSON.stringify(dbJson, null, 2));
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Reset link
    const resetUrl = `http://localhost:${process.env.PORT || 5000}/reset-password?token=${resetToken}`;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'FitNexus Password Reset',
      html: `
        <h1>Password Reset Request</h1>
        <p>You are receiving this email because you (or someone else) has requested to reset your password.</p>
        <p>Please click on the following link to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
        return res.status(500).json({ msg: 'Email could not be sent' });
      }
      res.json({ msg: 'Password reset email sent' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    // Find user by reset token and check if token is expired
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired reset token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    
    await user.save();

    // Update db.json
    const dbJsonPath = path.join(__dirname, '../../db.json');
    const dbJson = JSON.parse(fs.readFileSync(dbJsonPath));
    
    const userIndex = dbJson.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      dbJson.users[userIndex].resetToken = null;
      dbJson.users[userIndex].resetTokenExpiry = null;
      fs.writeFileSync(dbJsonPath, JSON.stringify(dbJson, null, 2));
    }

    res.json({ msg: 'Password has been reset' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;router.post('/', auth, (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const profileData = req.body;

    // Read db.json
    let dbData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));

    // Ensure profiles array exists
    if (!dbData.profiles) {
      dbData.profiles = [];
    }

    // Check if profile already exists
    const profileIndex = dbData.profiles.findIndex(profile => profile.userId === userId);

    if (profileIndex !== -1) {
      // Update existing profile
      dbData.profiles[profileIndex] = { ...profileData, userId, updatedAt: new Date().toISOString() };
    } else {
      // Add new profile
      dbData.profiles.push({ ...profileData, userId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }

    // Write back to db.json
    fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf8');

    res.json({ success: true, data: profileData });
  } catch (err) {
    console.error('Error in POST /api/profile:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});