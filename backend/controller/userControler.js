// const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const { generateToken } = require("../config/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      res.status(400);
      res.send("please check all the fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ msg: "user already exist" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "failed to create the user" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        msg: "login",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const allUsers = async (req, res) => {
  const keyWord = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: i } },
          { email: { $regex: req.query.search, $options: i } },
        ],
      }
    : {};
  const users = await User.find(keyWord).find({ _id: { $ne: req.user.id } });
};

module.exports = { registerUser, authUser, allUsers };
