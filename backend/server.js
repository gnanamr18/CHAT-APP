const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const onConnected = require("./utils/socket");

// const http = require("http");

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} on the PORT ${PORT}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  onConnected(socket);
});

//Load env var
dotenv.config({ path: "../config/.env" });

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var messages = mongoose.model("messages", { name: String, message: String });

app.get("/messages", (req, res) => {
  res.send("api running");
  res.status(200).json({ message: success });
});
