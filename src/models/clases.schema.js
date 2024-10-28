const { Schema, model } = require("mongoose");

const ClasesSchema = new Schema({
  nombreClase: {
    type: String,
    required: true,
    trim: true,
  },
  descripcionClase: {
    type: String,
    required: true,
    trim: true,
  },
  horario: {
    type: String,
    required: true,
  },
  dia: {
    type: String,
    required: true,
  },
  cuposPorDia: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    default: "",
    trim: true,
  },
});

const ClasesModel = model("clases", ClasesSchema);
module.exports = ClasesModel;
