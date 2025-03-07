require("dotenv").config();
require("../DB/config");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
require("../helpers/reinicio");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middlewares();
    this.rutas();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname + "/public")));
  }

  rutas() {
    this.app.get("/", (req, res) => {
      res.send("API Golden Code Gym está funcionando correctamente.");
    });
    this.app.use("/productosgym", require("../routes/productos.routes"));
    this.app.use("/usuariosgym", require("../routes/usuarios.routes"));
    this.app.use("/clasesgym", require("../routes/clases.routes"));
    this.app.use("/profesgym", require("../routes/profes.routes"));
    this.app.use("/planesgym", require("../routes/planes.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor Levantado", this.port);
    });
  }
}

module.exports = Server;
