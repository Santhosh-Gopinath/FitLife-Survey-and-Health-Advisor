const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    
    // Sync MongoDB data with db.json
    syncWithLocalStorage();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Using local db.json file only');
  }
};

// Function to sync MongoDB with local db.json
const syncWithLocalStorage = async () => {
  try {
    const dbJsonPath = path.join(__dirname, '../db.json');
    console.log('DB JSON path:', dbJsonPath);
    console.log('Syncing MongoDB with db.json...');
    const User = require('./models/User');
    
    // Get all users from MongoDB
    const users = await User.find().select('-password');
    
    // Read current db.json
    let dbJson = { users: [] };
    if (fs.existsSync(dbJsonPath)) {
      const data = fs.readFileSync(dbJsonPath);
      dbJson = JSON.parse(data);
    }
    
    // Update db.json with MongoDB data
    dbJson.users = users.map(user => ({
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      fullName: user.fullName || '',
      dateOfBirth: user.dateOfBirth || '',
      age: user.age || 0,
      gender: user.gender || '',
      bloodGroup: user.bloodGroup || '',
      height: user.height || 0,
      weight: user.weight || 0,
      phoneNo: user.phoneNo || '',
      address: user.address || '',
      resetToken: user.resetToken || null,
      resetTokenExpiry: user.resetTokenExpiry || null
    }));
    
    // Write back to db.json
    fs.writeFileSync(dbJsonPath, JSON.stringify(dbJson, null, 2));
    console.log('Synced MongoDB with db.json');
  } catch (err) {
    console.error('Error syncing with db.json:', err.message);
  }
};

module.exports = connectDB;