const express = require('express');

const router = express.Router();
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  // checkID,
} = require('../controllers/tourController');

// MIDDLEWARE
// router.param('id', checkID);

// ROUTES
router.route('/').get(getAllTours).post(createTour);
router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/tour-stat').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
