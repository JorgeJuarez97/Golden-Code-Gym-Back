const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  tipoDeProducto: {
    type: String,
    required: true,
    trim: true,
  },
  nombreProducto: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
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

const ProductModel = model("product", ProductSchema);
module.exports = ProductModel;
