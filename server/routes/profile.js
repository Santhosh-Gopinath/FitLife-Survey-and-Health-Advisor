const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fs = require('fs');
const path = require('path');
const Profile = require('../models/Profile'); // Assuming you have a Profile model

// Path to db.json
const dbJsonPath = path.join(__dirname, '../../db.json');

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', auth, (req, res) => {
  try {
    // Read the database file
    const dbData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
    
    // Find the user's profile
    const userId = req.user.id; // From auth middleware
    
    // Check if profiles array exists
    if (!dbData.profiles) {
      dbData.profiles = [];
      // Write the updated structure back to file
      fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf8');
    }
    
    const userProfile = dbData.profiles.find(profile => profile.userId === userId);
    
    if (!userProfile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    
    res.json(userProfile);
  } catch (err) {
    console.error('Error in GET /api/profile:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth,  (req, res) => {
  try {
    // Get user ID from auth middleware
    const userId = req.user.id;
    console.log('Received user ID from token:', userId);
    console.log('Processing profile save request for userId:', userId);
    console.log('Request body:', req.body); // Log the request body
    
    // Validate required fields
    const { fullName, dateOfBirth, age, gender } = req.body;
    if (!fullName || !dateOfBirth || !age || !gender) {
      console.log('validation failed - missing required fields');
      console.log('Request body:', req.body); // Log the request body
      return res.status(400).json({ msg: 'Please fill all required fields' });
    }
    
    // Read the database file
    let dbData;
    try {
      dbData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
    } catch (err) {
      // If file doesn't exist or is empty, initialize with empty structure
      dbData = { users: [], profiles: [] };
    }
    
    // Make sure profiles array exists
    if (!dbData.profiles) {
      dbData.profiles = [];
    }
    
    // Check if profile already exists for this user
    const profileIndex = dbData.profiles.findIndex(profile => profile.userId === userId);
    
    // Create profile object with timestamp
    const profileData = {
      ...req.body,
      userId,
      updatedAt: new Date().toISOString()
    };
    
    console.log('Profile data to save:', profileData); // Log the profile data
    console.log('Current profiles in db.json:', dbData.profiles); // Log current profiles
    if (profileIndex !== -1) {
      // Update existing profile
      dbData.profiles[profileIndex] = profileData;
    } else {
      // Add new profile
      profileData.createdAt = new Date().toISOString();
      dbData.profiles.push(profileData);
    }
    
    // Write updated data back to db.json
    fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf8');
    
    // Log success
    console.log(`Profile saved for user ${userId}`);
    console.log('Successfully wrote profile to db.json for user:', userId);
    
    console.log('Updated profiles in db.json:', dbData.profiles);
     // Log updated profiles
     console.log('writing to db.json:', dbData.profiles);
     fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2), 'utf8');
    console.log('Successfully wrote updated profiles to db.json');
    res.json({ success: true, data: profileData });
  } catch (err) {
    console.error('Error in POST /api/profile:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;