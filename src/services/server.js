// Needs

const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const { ProductosController } = require("../controller/productos");

//Init

const app = express();

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("public"));

//Handlebars

const viewsFolderPath = path.resolve(__dirname, "../../views");
const layoutsFolderPath = path.join(viewsFolderPath, "/layouts");
const partialsFolderPath = path.join(viewsFolderPath, "/partials");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: layoutsFolderPath,
    partialsDir: partialsFolderPath,
  })
);

app.set("view engine", "hbs");
app.set("views", viewsFolderPath);

// EndPoints

app.get("/productos", async (req, res) => {
  const productos = await ProductosController.getAll();
  const list = { productos };
  res.render("list", list);
});

app.post("/productos", async (req, res) => {
  await ProductosController.save(req.body);
  res.status(201).json({
    msg: "Producto guardado",
    data: req.body,
  });
});

// Export

module.exports = app;
