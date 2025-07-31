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
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    default: 5,
  },
  difficulty: {
    type: String,
    enums: ['easy', 'medium', 'difficult'],
    required: [true, 'A tour must have a difficulty'],
    default: 'easy',
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    // required: [true, 'Summary is required'],
  },
  description: {
    type: String,
    required: [true, 'A tour must have a description'],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: {
    type: [String],
  },
  startDates: {
    type: [Date],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false, // field will not be sent to the client
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
