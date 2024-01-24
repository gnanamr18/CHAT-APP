// const Msg = require("../Models/chatModel");

// let socketConnected = new Set();

// function onConnected(socket) {
//   socketConnected.add(socket.id);
//   console.log(socketConnected);

//   socket.emit("clients-total", socketConnected.size);

//   socket.on("message", async (data) => {
//     console.log(data);
//     socket.broadcast.emit("chat-message", data);
//     const message = new Msg({
//       msg: data.message,
//       sender: data.sender,
//     });
//     console.log(message);

//     await message
//       .save()
//       .then((message) => {
//         console.log(message);
//       })
//       .catch((error) => {
//         console.error(error.messsage);
//       });
//   });

//   socket.on("disconnect", (socket) => {
//     onDisconnected(socket);
//   });
// }

// function onDisconnected(socket) {
//   socketConnected.delete(socket.id);
//   socket.emit("clients-total", socketConnected.size);
// }

// module.exports = onConnected;
