const Tour = require('../models/tourModel');

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
exports.getAllTours = async (req, res) => {
  console.log(req.query);

  try {
    //1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['limit', 'sort', 'page', 'fields']; // Exclude fields from query params
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    //2) Sorting
    if (req.query.sort) {
      console.log(req.query, req.query.sort);
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt _id'); // Add _id as secondary sort for consistency
    }

    //3) Limiting fields: Reducing data sent to the client (Selecting specific fields is called PROJECTING)
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
      console.log(fields);
    } else {
      query = query.select('-__v');
    }

    //4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    if (req.query.page) {
      const numTours = await Tour.countDocuments(JSON.parse(queryStr));
      if (skip >= numTours) throw new Error("This page doesn't exist");
    }

    query = query.skip(skip).limit(limit);

    // Execute Query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message || error,
    });
  }
};

// POST: CREATE TOUR
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Tour created successfully!',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

// GET: TOUR
exports.getTour = async (req, res) => {
  console.log(req.params);
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

// PATCH: UPDATE TOUR
exports.updateTour = async (req, res) => {
  // console.log(req.params);
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

// DELETE: TOUR
exports.deleteTour = async (req, res) => {
  // console.log(req.params);
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: 'Tour deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};
