require('dotenv').config();
const mongoose = require("mongoose");

function connectDB() {
  return mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Database connected');
    })
    .catch(error => {
      console.error('Connection failed:', error.message);
      throw error; // Re-throw the error to maintain consistency with the async/await version
    });
}

module.exports = connectDB;
