const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxLength: [40, 'Name must be equal or less than 40 chars'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Please provide a valid email'],
    unique: true,
    lowercase: true, // convert to lowercase
  },
  photo: String,
  password: {
    type: String,
    required: true,
    validate: validator.isStrongPassword,
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: validator.isStrongPassword,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
