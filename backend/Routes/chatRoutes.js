const express = require("express");

const router = express.Router();
const { accessChat } = require("../controller/chatControler");
const { protect } = require("../Middleware/authMiddleware");

router.route("/accessChat").post(protect, accessChat);
// router.route("/").post(protect, fetchChat);

// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
