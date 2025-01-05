const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  obtenerTodosLosPlanes,
  obtenerUnPlan,
  crearUnPlan,
  actualizarUnPlan,
  eliminarUnPlan,
  deshabilitarPlan,
  habilitarPlan,
} = require("../controllers/planes.controllers");

router.get("/", obtenerTodosLosPlanes);
router.get("/:idPlan", obtenerUnPlan);

router.post("/", auth("admin"), crearUnPlan);

router.put("/:idPlan", auth("admin"), actualizarUnPlan);
router.put("/deshabilitar/:idPlan", auth("admin"), deshabilitarPlan);
router.put("/habilitar/:idPlan", auth("admin"), habilitarPlan);

router.delete("/:idPlan", auth("admin"), eliminarUnPlan);

module.exports = router;
