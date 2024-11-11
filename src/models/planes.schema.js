const { Schema, model } = require("mongoose");

const PlanesSchema = new Schema({
  nombrePlan: {
    type: String,
    required: true,
    trim: true,
  },
  acceso: {
    type: String,
    required: true,
    trim: true,
  },
  cuotaMensual: {
    type: Number,
    required: true,
    trim: true,
  },
});

const PlanesModel = model("plan", PlanesSchema);
module.exports = PlanesModel;
