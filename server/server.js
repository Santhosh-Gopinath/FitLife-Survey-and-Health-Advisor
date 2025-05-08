const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./db');
const dotenv = require('dotenv');
const auth = require('./middleware/auth');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../client')));

// Create db.json if it doesn't exist
const dbJsonPath = path.join(__dirname, '../db.json');
if (!fs.existsSync(dbJsonPath)) {
  console.log('Creating new db.json file');
  fs.writeFileSync(dbJsonPath, JSON.stringify({ users: [], profiles: [] }, null, 2));
  console.log('db.json file created successfully');
}

// Auth routes - assuming these are already implemented
app.use('/api/auth', require('./routes/auth'));
// Profile routes
// If you already have a separate profile routes file, keep using that instead
// Otherwise, implement the profile routes directly in server.js:
app.get('/api/profile', auth, (req, res) => {
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

app.post('/api/profile', auth, (req, res) => {
  try {
    // Get user ID from auth middleware
    const userId = req.user.id;
    
    // Validate required fields
    const { fullName, dateOfBirth, age, gender } = req.body;
    if (!fullName || !dateOfBirth || !age || !gender) {
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
    
    res.json({ success: true, data: profileData });
  } catch (err) {
    console.error('Error in POST /api/profile:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// If you want to keep your existing modular structure with separate route files,
// You can move the above profile routes to a separate file "routes/profile.js"
// And keep using: app.use('/api/profile', require('./routes/profile'));

// Serve static assets
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dashboard.html'));
});

// Catch-all route for client-side routing (if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));