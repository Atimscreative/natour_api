const express = require('express');
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { signup } = require('../controllers/authController');

const router = express.Router();

// ROUTES
router.post('/signup', signup);

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
