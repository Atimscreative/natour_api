const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Shutting down 💥');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(err));

// SERVER LISTENING
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Shutting down 💥');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
