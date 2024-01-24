const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controller/userControler.js");
const { protect } = require("../Middleware/authMiddleware");

router.post("/register", (req, res) => {
  registerUser(req, res);
});

router.post("/login", (req, res) => {
  authUser(req, res);
  console.log("hi");
});

router.get("/allUsers", allUsers);
module.exports = router;
