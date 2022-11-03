const socketIo = require('socket.io');
const { formatMessages } = require('../utils/messages');
const { ProductosController } = require("../controller/productos");

const data = {
  username: undefined,
  text: undefined,
};

let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');

    socket.on("addProduct", async (obj) => {
        await ProductosController.save(obj)
        io.emit("products", obj)
    })

    socket.on('chatMessage', (obj) => {
      data.username = obj.user;
      data.text = obj.msg;
      io.emit('message', formatMessages(data));
    });



  });

  return io;
};

const getWsServer = () => {
  return io;
}

module.exports = {
  initWsServer,
  getWsServer
};