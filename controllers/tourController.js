const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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
exports.getAllTours = (req, res) => {
  console.log(req.requestedTime);

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours },
  });
};

// POST: CREATE TOUR
exports.createTour = (req, res) => {
  const newId = tours.length + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// GET: TOUR
exports.getTour = (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  const tour = tours.find((el) => el.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

// PATCH: UPDATE TOUR
exports.updateTour = (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  const tour = tours.find((el) => el.id === Number(id));

  const updatedTour = { ...tour, ...req.body };

  res.status(200).json({
    status: 'success',
    data: { tour: '<updatedTour>' },
  });
};

// DELETE: TOUR
exports.deleteTour = (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  const tour = tours.find((el) => el.id === Number(id));

  const updatedTour = { ...tour, ...req.body };

  res.status(204).json({
    status: 'success',
    message: 'Tour deleted successfully!',
    data: null,
  });
};
