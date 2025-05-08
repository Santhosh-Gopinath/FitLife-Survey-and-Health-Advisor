const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Helper function to access db.json without MongoDB
module.exports.getUserFromDbJson = function(userId) {
  try {
    const dbJsonPath = path.join(__dirname, '../../db.json');
    const dbJson = JSON.parse(fs.readFileSync(dbJsonPath));
    
    const user = dbJson.users.find(user => user.id === userId);
    return user || null;
  } catch (err) {
    console.error('Error reading from db.json:', err);
    return null;
  }
};

// Helper function to update db.json
module.exports.updateDbJson = function(users) {
  try {
    const dbJsonPath = path.join(__dirname, '../../db.json');
    const dbJson = { users };
    fs.writeFileSync(dbJsonPath, JSON.stringify(dbJson, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return false;
  }
};