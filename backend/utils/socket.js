const Msg = require("../Models/Message");

let socketConnected = new Set();

function onConnected(socket) {
  socketConnected.add(socket.id);
  console.log(socketConnected);

  socket.emit("clients-total", socketConnected.size);

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("chat-message", data);
  });

  socket.on("disconnect", (socket) => {
    onDisconnected(socket);
  });
}

function onDisconnected(socket) {
  socketConnected.delete(socket.id);
  socket.emit("clients-total", socketConnected.size);
}

module.exports = onConnected;
