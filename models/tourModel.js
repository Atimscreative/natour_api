const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
  },
  maxGroupSize: {
    type: Number,
    default: 5,
  },
  difficulty: {
    type: String,
    enums: ['easy', 'medium', 'difficult'],
    default: 'easy',
  },
  ratingsAverage: {
    type: Number,
    default: 4.0,
  },
  ratingsQuantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  imageCover: {
    type: String,
  },
  images: {
    type: [String],
  },
  startDates: {
    type: [Date],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
