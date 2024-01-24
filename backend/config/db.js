const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gnanamr18:chatapp@cluster0.v7ax114.mongodb.net/"
    );

    console.log("mongodb connected...");
  } catch (err) {
    console.error(err.message);

    //Exit process with failure
    process.exit();
  }
};

module.exports = connectDB;
