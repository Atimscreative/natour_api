const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

// ALIAS: TOP 5 TOURS - MIDDLEWARE HANDLER
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

// PARAMS MIDDLEWARE: CHECK TOUR ID
// exports.checkID = (req, res, next, val) => {
//   console.log(req.params);
//   const { id } = req.params;

//   const tour = tours.find((el) => el.id === Number(id));

//   if (!tour) {
//     return res.status(404).json({
//       status: 'failed',
//       message: `Tour not found with the ID of ${id}`,
//     });
//   }

//   next();
// };

// CHECK REQUEST BODY
// exports.checkBody = (req, res, next) => {
//   const { name, price } = req.body;
//   if (!name || !price) {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'Bad request: Missing name/price',
//     });
//   }

//   next();
// };

// GET: ALL TOURS
exports.getAllTours = catchAsync(async (req, res, next) => {
  console.log(req.query);

  //1A) Filtering
  // const queryObj = { ...req.query };
  // const excludedFields = ['limit', 'sort', 'page', 'fields']; // Exclude fields from query params
  // excludedFields.forEach((el) => delete queryObj[el]);

  // //1B) Advance Filtering
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

  // let query = Tour.find(JSON.parse(queryStr));

  // //2) Sorting
  // if (req.query.sort) {
  //   console.log(req.query, req.query.sort);
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort('-createdAt _id'); // Add _id as secondary sort for consistency
  // }

  // //3) Limiting fields: Reducing data sent to the client (Selecting specific fields is called PROJECTING)
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(',').join(' ');
  //   query = query.select(fields);
  //   console.log(fields);
  // } else {
  //   query = query.select('-__v');
  // }

  // //4) Pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;

  // if (req.query.page) {
  //   const numTours = await Tour.countDocuments(JSON.parse(queryStr));
  //   if (skip >= numTours) throw new Error("This page doesn't exist");
  // }

  // query = query.skip(skip).limit(limit);

  // Execute Query
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
});

// POST: CREATE TOUR
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    message: 'Tour created successfully!',
    data: {
      tour: newTour,
    },
  });
});

// GET: TOUR
exports.getTour = catchAsync(async (req, res, next) => {
  console.log(req.params);

  const tour = await Tour.findById(req.params.id);

  if (!tour) next(new Error('No tour found with that iD', 404));

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

// PATCH: UPDATE TOUR
exports.updateTour = catchAsync(async (req, res, next) => {
  // console.log(req.params);

  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

// DELETE: TOUR
exports.deleteTour = catchAsync(async (req, res, next) => {
  // console.log(req.params);

  await Tour.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    message: 'Tour deleted successfully!',
    data: null,
  });
});

// TOUR STATISTICS -  AGGREGATION PIPELINE
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stat = await Tour.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } }, // Sort by Avg Price in asc order using 1 & -1 for desc order
    { $match: { _id: { $ne: 'EASY' } } },
  ]);

  res
    .status(200)
    .json({ status: 'success', result: stat.length, data: { stat } });
});

// TOUR MONTHLY PLAN
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStats: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $addFields: { month: `$_id` } },
    { $project: { _id: 0 } },
  ]);

  res
    .status(200)
    .json({ status: 'success', results: plan.length, data: { plan } });
});
