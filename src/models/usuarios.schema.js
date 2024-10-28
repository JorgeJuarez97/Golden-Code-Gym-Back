const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  dni: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  emailUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
    trim: true,
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  rol: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  idCarrito: {
    type: String,
  },
});

UsersSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UsersModel = model("user", UsersSchema);
module.exports = UsersModel;
