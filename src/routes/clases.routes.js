const express = require("express");
const {
  obtenerTodasLasClases,
  obtenerUnaClase,
  crearUnaClase,
  reservarUnaClase,
  actualizarUnaClase,
  eliminarUnaClase,
  eliminarReservarUnaCLase,
} = require("../controllers/clases.controllers");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", obtenerTodasLasClases);

router.get("/:idClase", obtenerUnaClase);

router.post("/", crearUnaClase);

router.post("/reservarCupo/:idClase", auth("user"), reservarUnaClase);

router.put("/:idClase", actualizarUnaClase);

router.delete("/:idClase", eliminarUnaClase);

router.delete(
  "/eliminarReservarCupo/:idClase",
  auth("user"),
  eliminarReservarUnaCLase
);

module.exports = router;
