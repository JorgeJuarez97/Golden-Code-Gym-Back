const express = require("express");
const {
  obtenerTodasLasClases,
  obtenerUnaClase,
  crearUnaClase,
  reservarUnaClase,
  actualizarUnaClase,
  eliminarUnaClase,
  eliminarReservarUnaCLase,
  deshabilitarClase,
  habilitarClase,
  agregarImagenClase,
  verificarUnaReserva,
} = require("../controllers/clases.controllers");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.get("/", obtenerTodasLasClases);

router.get("/:idClase", obtenerUnaClase);
router.get("/verificarReserva/:idClase", auth("user"), verificarUnaReserva);

router.post("/", auth("admin"), crearUnaClase);

router.post("/reservarCupo/:idClase", auth("user"), reservarUnaClase);
router.post(
  "/agregarImagen/:idClase",
  multer.single("image"),
  agregarImagenClase
);

router.put("/:idClase", actualizarUnaClase);
router.put("/deshabilitar/:idClase", auth("admin"), deshabilitarClase);
router.put("/habilitar/:idClase", auth("admin"), habilitarClase);

router.delete("/:idClase", eliminarUnaClase);

router.delete(
  "/eliminarReservarCupo/:idClase",
  auth("user"),
  eliminarReservarUnaCLase
);

module.exports = router;
