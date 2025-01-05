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
  obtenerTodosLosProductosPorTipo,
  agregarImagenProducto,
  pagarProductos,
  deshabilitarProducto,
  habilitarProducto,
} = require("../controllers/productos.controllers");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.get("/", obtenerTodosLosProductos);
router.get("/tipo/:tipoDeProducto", obtenerTodosLosProductosPorTipo);
router.get("/obtenerProductosCarrito", auth("user"), obtenerProductosCarrito);
router.get("/:idProducto", obtenerUnProducto);

router.post("/", auth("admin"), crearUnProducto);
router.post(
  "/agregarProductoCarrito/:idProducto",
  auth("user"),
  agregarUnProductoAlCarrito
);
router.post(
  "/agregarImagen/:idProducto",
  multer.single("image"),
  agregarImagenProducto
);
router.post("/pagarCarritoProductos", auth("user"), pagarProductos);

router.put("/:idProducto", auth("admin"), actualizarUnProducto);
router.put("/deshabilitar/:idProducto", auth("admin"), deshabilitarProducto);
router.put("/habilitar/:idProducto", auth("admin"), habilitarProducto);

router.delete("/:idProducto", auth("admin"), eliminarUnProducto);
router.delete(
  "/eliminarProductoCarrito/:idProducto",
  auth("user"),
  eliminarUnProductoDelCarrito
);

module.exports = router;
