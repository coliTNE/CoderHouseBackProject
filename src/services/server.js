// Needs

const express = require("express");
const morgan = require("morgan")
const indexRouter = require("../routes/index.routes");

const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("public"));

// Routes

app.use("/api", indexRouter);

// Export

module.exports = app;
