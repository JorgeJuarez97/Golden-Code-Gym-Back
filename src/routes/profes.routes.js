const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  obtenerTodosLosProfes,
  obtenerUnProfe,
  crearUnProfe,
  actualizarUnProfe,
  eliminarUnProfe,
  agregarImagenProfe,
  deshabilitarProfe,
  habilitarProfe,
} = require("../controllers/profes.controllers");
const multer = require("../middlewares/multer");

router.get("/", obtenerTodosLosProfes);
router.get("/:idProfe", obtenerUnProfe);

router.post("/", auth("admin"), crearUnProfe);
router.post(
  "/agregarImagen/:idProfe",
  multer.single("image"),
  agregarImagenProfe
);

router.put("/:idProfe", auth("admin"), actualizarUnProfe);
router.put("/deshabilitar/:idProfe", auth("admin"), deshabilitarProfe);
router.put("/habilitar/:idProfe", auth("admin"), habilitarProfe);

router.delete("/:idProfe", auth("admin"), eliminarUnProfe);

module.exports = router;
