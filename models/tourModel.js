/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

console.log(slugify('The Test tour', { lower: true }));

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxLength: [40, 'Tour name must be equal or less than 40 chars'],
      minLength: [10, 'Tour name must be greater or equal to 10 chars'],
      validate: [validator.isAlpha, 'Tour name must only contain letters'],
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
      min: [1, 'Rating must be above 1.0 '],
      max: [5, 'Rating must be below 5.0 '],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price ',
    },
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
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  if (this.name) {
    // console.log(this, this.name, 'Slug');

    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

tourSchema.post('save', (doc, next) => {
  // this.slug = slugify(this.name, { lower: true });
  // console.log(doc);

  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
