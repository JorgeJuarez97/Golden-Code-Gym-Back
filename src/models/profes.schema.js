const { Schema, model } = require("mongoose");

const ProfesSchema = new Schema({
  nombreProfe: {
    type: String,
    required: true,
    trim: true,
  },
  clase: {
    type: String,
    required: true,
    trim: true,
  },
  zonaDeMusculacion: {
    type: String,
    required: true,
    trim: true,
  },
  reseñaAcademica: {
    type: String,
    required: true,
    trim: true,
  },
  imagen: {
    type: String,
    default: "",
    trim: true,
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
});

const ProfesModel = model("profe", ProfesSchema);
module.exports = ProfesModel;
