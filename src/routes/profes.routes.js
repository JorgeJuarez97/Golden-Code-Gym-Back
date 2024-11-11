const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  obtenerTodosLosProfes,
  obtenerUnProfe,
  crearUnProfe,
  actualizarUnProfe,
  eliminarUnProfe,
} = require("../controllers/profes.controllers");

router.get("/", obtenerTodosLosProfes);
router.get("/:idProfe", obtenerUnProfe);

router.post("/", auth("admin"), crearUnProfe);

router.put("/:idProfe", auth("admin"), actualizarUnProfe);

router.delete("/:idProfe", auth("admin"), eliminarUnProfe);

module.exports = router;
