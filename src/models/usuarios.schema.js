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

UserSchema.pre("save", function (next) {
  this.nombreUsuario = `${this.nombre} ${this.apellido}`;
  next();
});

UserSchema.pre("save", function (next) {
  if (this.rol !== "user") {
    this.idCarrito = undefined;
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UsersModel = model("user", UserSchema);
module.exports = UsersModel;
