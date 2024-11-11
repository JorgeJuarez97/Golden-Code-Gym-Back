require("dotenv").config();
require("../DB/config");
const express = require("express");
const path = require("path");
const morgan = require("morgan");

class Server {
  constructor() {
    this.app = express();
    this.port = 3001;
    this.middlewares();
    this.rutas();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname + "/public")));
  }

  rutas() {
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
