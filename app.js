const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
// const crypto = require('crypto');
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);

dotenv.config({ path: './config.env' });

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// console.log(process.env);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// // GLOBAL MIDDLEWARE: APPLY TO ALL ROUTES THAT COMES AFTER THIS
// app.use((req, res, next) => {
//   console.log('Hello');
//   next();
// });

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// GLOBAL ERROR HANLDING MIDDLEWARE
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
