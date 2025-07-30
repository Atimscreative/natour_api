// const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// PARAMS MIDDLEWARE: CHECK TOUR ID
exports.checkID = (req, res, next, val) => {
  console.log(req.params);
  const { id } = req.params;

  const tour = tours.find((el) => el.id === Number(id));

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: `Tour not found with the ID of ${id}`,
    });
  }

  next();
};

// CHECK REQUEST BODY
exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Bad request: Missing name/price',
    });
  }

  next();
};

// GET: ALL TOURS
exports.getAllTours = async (req, res) => {
  console.log(req.requestedTime);

  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error,
    });
  }
};

// POST: CREATE TOUR
exports.createTour = async (req, res) => {
  // const newId = tours.length + 1;
  // eslint-disable-next-line prefer-object-spread
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // const testTour = new Tour({
  //   name: 'The testing tour',
  //   rating: '4.9',
  //   price: 497,
  // });
  // testTour
  //   .save()
  //   .then((doc) => console.log(doc))
  //   .catch((err) => console.log(err));

  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   () => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   },
  // );

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
exports.getTour = (req, res) => {
  console.log(req.params);
  try {
    const tour = Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

// PATCH: UPDATE TOUR
exports.updateTour = (req, res) => {
  console.log(req.params);
  // const { id } = req.params;

  // const tour = tours.find((el) => el.id === Number(id));

  // const updatedTour = { ...tour, ...req.body };

  res.status(200).json({
    status: 'success',
    data: { tour: '<updatedTour>' },
  });
};

// DELETE: TOUR
exports.deleteTour = (req, res) => {
  console.log(req.params);
  // const { id } = req.params;

  // const tour = tours.find((el) => el.id === Number(id));

  // const updatedTour = { ...tour, ...req.body };

  res.status(204).json({
    status: 'success',
    message: 'Tour deleted successfully!',
    data: null,
  });
};
