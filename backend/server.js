const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const chatRoutes = require("./Routes/chatRoutes");
const userRoutes = require("./Routes/userRoutes");
const messageRoute = require("./Routes/messageRoute");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} on the PORT ${PORT}`);
});

app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoute);
app.get("/", (req, res) => {
  res.send("API Running");
});
