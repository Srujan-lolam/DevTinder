const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL;
const connectDb = async () => {
  await mongoose.connect(URL);
};

module.exports = {
  connectDb,
};
