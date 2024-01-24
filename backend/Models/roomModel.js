const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },

  receiver: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
