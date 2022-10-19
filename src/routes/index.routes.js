// Needs
const { Router } = require("express");
const indexRouter = Router();
const productosRouter = require("./productos.routes");

// Routes

indexRouter.use("/productos", productosRouter);

// Export

module.exports = indexRouter;
