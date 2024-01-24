// const io = require("socket.io - client");

const socket = io.connect("http://localhost:3000");

const clientsTotal = document.getElementById("clients-total");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const userControler = require("../backend/controller/userControler");

console.log(userControler.authUser);

socket.on("clients-total", (data) => {
  console.log(data);
  clientsTotal.innerText = `Total Clients: ${data}`;
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

function sendMessage() {
  const data = {
    sender: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };

  socket.emit("message", data);
  addMessageToUI(true, data);
  messageInput.value = "";
}

socket.on("chat-message", (data) => {
  console.log(data);
  addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessage, data) {
  console.log(isOwnMessage);
  const element = `
      <li class="${isOwnMessage ? "message-right" : "message-left"}">
        <p class="message">
          ${data.message}
          <span>
            ${data.name}
          </span>
        </p>
      </li>`;

  messageContainer.innerHTML += element;
}
