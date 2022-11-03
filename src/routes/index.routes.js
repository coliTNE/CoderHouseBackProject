const express = require("express");
const { ProductosController } = require("../controller/productos");
const router = express.Router();


router.get("/", async (req, res) => {
  const productos = { list: await ProductosController.getAll() };
  res.render("index", productos);
});


module.exports = router;
