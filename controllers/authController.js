const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  // const { email } = req.body;

  // const user = await User.findOne({ email });

  // console.log(user);

  // if (user)
  //   res.status(400).json({
  //     status: 'failed',
  //     message: 'User already exist',
  //   });

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.login = async (req, res) => {};

exports.forgetPassword = async (req, res) => {};
