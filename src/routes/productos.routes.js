// Needs

const { Router } = require("express");
const { ProductosController } = require("../controller/productos");

// Config

const productosRouter = Router();

// EndPoints

productosRouter.get("/", async (req, res) => {
  res.status(200).json({
    msg: await ProductosController.getAll(),
  });
});

productosRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const productoExiste = await ProductosController.getById(id);
  if (!productoExiste) {
    res.status(404).json({
      msg: "El producto no existe",
    });
    return;
  }
  res.status(200).json({
    msg: "Producto Encontrado",
    data: productoExiste,
  });
});

productosRouter.post("/", async (req, res) => {
  await ProductosController.save(req.body);
  res.status(201).json({
    msg: "Producto guardado",
    data: req.body,
  });
});

productosRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const productoExiste = await ProductosController.getById(id);
  if (!productoExiste) {
    res.status(404).json({
      msg: "El producto no existe",
    });
    return;
  }
  const productoActualizado = await ProductosController.updateById(
    id,
    req.body
  );
  res.status(202).json({
    msg: "El producto fue actualizado",
    data: productoActualizado,
  });
});

productosRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const productoExiste = await ProductosController.getById(id);
  if (!productoExiste) {
    res.status(404).json({
      msg: "El producto no existe",
    });
    return;
  }
  await ProductosController.deleteById(id);
  res.status(200).json({
    msg: "El producto fue eliminado",
  });
});

// Export

module.exports = productosRouter;
