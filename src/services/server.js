// Needs

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const http = require("http");
const { initWsServer } = require("./socket")
const mainRouter = require("../routes/index.routes")

//Init

const app = express();
const server = http.Server(app);
initWsServer(server);

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("public"));


// EJS

const viewsFolderPath = path.resolve(__dirname, "../../views");
app.set("view engine", "ejs");
app.set("views", viewsFolderPath);

// EndPoints

app.use("/", mainRouter)

// Export

module.exports = server;
