const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Prediction = require('../models/Prediction');

// @route   POST api/predictions
// @desc    Save a new prediction
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { symptoms, predictedDisease, description, precautions, medications, diet, workout } = req.body;
    const userId = req.user.id;

    const prediction = new Prediction({
      userId,
      symptoms,
      predictedDisease,
      description,
      precautions,
      medications,
      diet,
      workout
    });

    await prediction.save();

    // Update db.json (optional, for consistency with existing setup)
    const dbJsonPath = path.join(__dirname, '../../db.json');
    let dbData = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
    if (!dbData.predictions) dbData.predictions = [];
    dbData.predictions.push({
      id: prediction._id.toString(),
      userId,
      symptoms,
      predictedDisease,
      timestamp: prediction.timestamp
    });
    fs.writeFileSync(dbJsonPath, JSON.stringify(dbData, null, 2));

    res.json({ success: true, data: prediction });
  } catch (err) {
    console.error('Error in POST /api/predictions:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   GET api/predictions
// @desc    Get user's prediction history
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const predictions = await Prediction.find({ userId }).sort({ timestamp: -1 });
    res.json(predictions);
  } catch (err) {
    console.error('Error in GET /api/predictions:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;