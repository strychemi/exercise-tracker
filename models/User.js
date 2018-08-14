const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// for now, using mongoose to validate our data
// can add more levels of validation later if time allows
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true, // this ensures uniqueness for indexed values
    required: 'username is required'
  }
});

// index by username as well
userSchema.index({ username: 'text' });

module.exports = mongoose.model('User', userSchema);