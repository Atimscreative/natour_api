const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

console.log('ENV:', process.env.NODE_ENV);

// SERVER LISTENING
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
