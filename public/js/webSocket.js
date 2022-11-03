// Needs

const nombre = document.getElementById("name");
const precio = document.getElementById("price");
const imagen = document.getElementById("thumbnail");
const productForm = document.getElementById("product-form");
const productList = document.querySelector(".products");

const chatForm = document.getElementById("chat-form");
const msg = document.getElementById("msg");
const mail = document.getElementById("mail");
const chatMessages = document.querySelector(".chat-messages");


const socket = io.connect();

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("addProduct", {
    title: nombre.value,
    price: precio.value,
    thumbnail: imagen.value,
  });
});

socket.on("products", (obj) => {
  outputObj(obj);
});

function outputObj(obj) {
  const div = document.createElement("div");
  div.classList.add("list");
  div.innerHTML = `
  <div class="list__col">
    <h2>${obj.title}</h2>
  </div>
  <div class="list__col">
    <h2>${obj.price}</h2>
  </div>
  <div class="list__col">
    <img src=${obj.thumbnail} alt="err img">
  </div>`;
  productList.appendChild(div);
}

socket.on("message", (data) => {
  outputMessage(data);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("chatMessage", { user: mail.value, msg: msg.value });
  msg.value = "";
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
  <p class="meta">${message.username} <span> ${message.time}</span></p>
  <p class="text"> ${message.text} </p>`;
  chatMessages.appendChild(div);
}
