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
  cantidad: {
    type: Number,
    required: true,
    default: 1,
  },
});

const ProductModel = model("product", ProductSchema);
module.exports = ProductModel;
