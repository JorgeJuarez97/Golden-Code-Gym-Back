const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.get("/", auth("user"), obtenerTodasLasClases);

router.get("/:idClase", obtenerUnaClase);

router.post("/", auth("admin"), crearUnaClase);

router.post(
  "/agregarImagen/:idClase",
  multer.single("image"),
  agregarImagenClase
);

router.post("/reservarCupo/:idClase", auth("user"), reservarUnCupo);

router.put("/:idClase", actualizarUnaClase);

router.delete("/idClase", auth("admin"), eliminarUnaClase);

router.delete("/reservarCupo/:idClase", auth("user"), eliminarReserva);
