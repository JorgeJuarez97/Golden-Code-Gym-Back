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
    type: Number,
    required: true,
  },
  usuariosReservados: [],
  bloqueado: {
    type: Boolean,
    default: false,
  },
  imagen: {
    type: String,
    default: "",
    trim: true,
  },
});

const ClasesModel = model("clases", ClasesSchema);
module.exports = ClasesModel;
