const express = require("express");
const {
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  crearUnUsuario,
  inicioDeSesionUsuario,
  deshabilitarUsuario,
  habilitarUsuario,
  actualizarUnUsuario,
  eliminarUnUsuario,
} = require("../controllers/usuarios.controllers");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get("/:idUsuario", auth("admin"), obtenerUnUsuario);

router.post(
  "/",
  [
    check("nombre", "Campo NOMBRE esta vacio").not().isEmpty(),
    check("apellido", "Campo APELLIDO esta vacio").not().isEmpty(),
    check("dni", "Campo DNI esta vacio").not().isEmpty(),
    check("emailUsuario", "Campo EMAILUSUARIO esta vacio").not().isEmpty(),
    check("contrasenia", "Campo CONTRASENIA esta vacio").not().isEmpty(),
    check("contrasenia", "Min: 8 caracteres y Max: 30 caracteres").isLength({
      min: 8,
      max: 30,
    }),
  ],
  crearUnUsuario
);
router.post("/iniciarSesion", inicioDeSesionUsuario);

router.put("/deshabilitar/:idUsuario", auth("admin"), deshabilitarUsuario);
router.put("/habilitar/:idUsuario", auth("admin"), habilitarUsuario);
router.put("/:idUsuario", auth("admin"), actualizarUnUsuario);

router.delete("/:idUsuario", auth("admin"), eliminarUnUsuario);

module.exports = router;
