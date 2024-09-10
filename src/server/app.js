require("dotenv").config();
require("../DB/config");
const express = require("express");
const morgan = require("morgan");

class Server {
  constructor() {
    this.app = express();
    this.port = 3001;
    this.milddlewares();
  }

  milddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor Levantado", this.port);
    });
  }
}

module.exports = Server;
