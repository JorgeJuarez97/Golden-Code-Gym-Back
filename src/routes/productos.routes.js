const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  crearUnProducto,
  actualizarUnProducto,
  eliminarUnProducto,
  agregarUnProductoAlCarrito,
  eliminarUnProductoDelCarrito,
  obtenerProductosCarrito,
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth("user"), obtenerTodosLosProductos);

router.get("/obtenerProductosCarrito", auth("user"), obtenerProductosCarrito);

router.get("/:idProducto", obtenerUnProducto);

router.post("/", auth("admin"), crearUnProducto);

router.post(
  "/agregarProductoCarrito/:idProducto",
  auth("user"),
  agregarUnProductoAlCarrito
);

router.put("/:idProducto", auth("admin"), actualizarUnProducto);

router.delete("/:idProducto", auth("admin"), eliminarUnProducto);

router.delete(
  "/eliminarProductoCarrito/:idProducto",
  auth("user"),
  eliminarUnProductoDelCarrito
);

module.exports = router;
