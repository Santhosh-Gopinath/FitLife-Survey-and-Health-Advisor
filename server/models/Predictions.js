const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symptoms: {
    type: [String],
    required: true
  },
  predictedDisease: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  precautions: {
    type: [String],
    default: []
  },
  medications: {
    type: [String],
    default: []
  },
  diet: {
    type: [String],
    default: []
  },
  workout: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prediction', PredictionSchema);