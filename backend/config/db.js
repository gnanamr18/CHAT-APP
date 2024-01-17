const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("mongodb connected...");
  } catch (err) {
    console.error(err.message);

    //Exit process with failure
    process.exit();
  }
};

module.exports = connectDB;
