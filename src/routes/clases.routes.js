const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  obtenerTodasLasClases,
  obtenerUnaClase,
  crearUnaClase,
  reservarUnaClase,
  actualizarUnaClase,
  eliminarUnaClase,
  eliminarReservarUnaCLase,
} = require("../controllers/clases.controllers");

router.get("/", auth("user"), obtenerTodasLasClases);

router.get("/:idClase", obtenerUnaClase);

router.post("/", auth("admin"), crearUnaClase);

router.post("/reservarCupo/:idClase", auth("user"), reservarUnaClase);

router.put("/:idClase", actualizarUnaClase);

router.delete("/idClase", auth("admin"), eliminarUnaClase);

router.delete("/reservarCupo/:idClase", auth("user"), eliminarReservarUnaCLase);
