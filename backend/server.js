const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Load env var
dotenv.config({ path: "./config/.env" });
console.log(process.env);

const app = express();
connectDB();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var messages = mongoose.model("messages", { name: String, message: String });

app.get("/messages", (req, res) => {
  res.send("api running");
  res.status(200).json({ message: success });
});

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} on the PORT ${PORT}`);
});
