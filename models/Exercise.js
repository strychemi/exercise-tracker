const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const exerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'A user is required'
  },
  description: {
    type: String,
    required: 'description required'
  },
  duration: {
    type: Number,
    required: 'duration in minutes required',
    min: 1
  },
  date: {
    type: Date,
    default: Date.now,
    required: 'date required'
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);