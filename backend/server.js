const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const http = require("http");

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} on the PORT ${PORT}`);
});

const io = require("socket.io")(server);

//Load env var
dotenv.config({ path: "../config/.env" });

connectDB();

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on("connection", onConnected);

let socketConnected = new Set();

function onConnected(socket) {
  console.log(socket.id);
  socketConnected.add(socket.id);

  io.emit("clients-total", socketConnected.size);

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    socketConnected.delete(socket.id);
    io.emit("clients-total", socketConnected.size);
  });

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("chat-message", data);
  });
}

var messages = mongoose.model("messages", { name: String, message: String });

app.get("/messages", (req, res) => {
  res.send("api running");
  res.status(200).json({ message: success });
});
