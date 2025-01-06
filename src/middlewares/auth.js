const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Formato de token inválido" });
  }

  const verificarToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
      }

      if (rolRuta && decoded.rol !== rolRuta) {
        return res
          .status(403)
          .json({ msg: "No estás autorizado para acceder a esta ruta" });
      }

      req.idUsuario = decoded.idUsuario;
      req.rol = decoded.rol;

      next();
    }
  );
};
