const mongoose = require('mongoose');
const validator = require('validator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

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
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      // This only work on SAVE & CREATE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run if password was actually modified
  if (!this.isModified('password')) return next();

  // Pass the password with cost of 12 (CPU intensive)
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the password confirm
  this.passwordConfirm = undefined; // delete from DB

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
