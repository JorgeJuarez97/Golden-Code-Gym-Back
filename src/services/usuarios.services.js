const UsersModel = require("../models/usuarios.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CartModel = require("../models/carrito.schema");
const { darBienvenidaUsuario } = require("../helpers/mensajes.mails");

const obtenerUsuarios = async () => {
  const usuarios = await UsersModel.find();

  return {
    usuarios,
    statusCode: 200,
  };
};

const obtenerUsuario = async (idUsuario) => {
  const usuario = await UsersModel.findOne({ _id: idUsuario });

  return {
    usuario,
    statusCode: 200,
  };
};

const crearUsuario = async (body) => {
  const usuarioExiste = await UsersModel.findOne({
    emailUsuario: body.emailUsuario,
  });

  if (usuarioExiste) {
    return {
      msg: "Usuario no disponible",
      statusCode: 400,
    };
  }

  if (body?.rol && body?.rol !== "admin" && body?.rol !== "user") {
    return {
      msg: "Rol incorrecto. Solo se puede elegir entre USER/ADMIN",
      statudCode: 400,
    };
  }

  const usuario = new UsersModel(body);
  const carrito = new CartModel({ idUsuario: usuario._id });

  usuario.idCarrito = carrito._id;

  const salt = await bcrypt.genSalt(10);
  usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, salt);

  await carrito.save();
  await usuario.save();

  await darBienvenidaUsuario(usuario.emailUsuario, usuario.nombreUsuario);

  return {
    msg: "Usuario creado con exito",
    statusCode: 201,
  };
};

const actualizarUsuario = async (body, idUsuario) => {
  await UsersModel.findByIdAndUpdate({ _id: idUsuario }, body);

  return {
    msg: "Usuario actualizado",
    statusCode: 200,
  };
};

const eliminarUsuario = async (idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);

  if (!usuario) {
    return {
      msg: "Usuario no encontrado",
      statusCode: 404,
    };
  }

  await CartModel.findByIdAndDelete({ _id: usuario.idCarrito });
  await UsersModel.findByIdAndDelete({ _id: idUsuario });

  return {
    msg: "Usuario eliminado",
    statusCode: 200,
  };
};

const iniciarSesion = async (body) => {
  const usuarioExiste = await UsersModel.findOne({
    emailUsuario: body.emailUsuario,
  });

  if (usuarioExiste.bloqueado) {
    return {
      msg: "Usuario bloqueado",
      statusCode: 400,
    };
  }

  if (!usuarioExiste) {
    return {
      msg: "Usuario y/o contraseña incorrecto",
      statusCode: 400,
    };
  }

  const compararContrasenias = await bcrypt.compare(
    body.contrasenia,
    usuarioExiste.contrasenia
  );

  if (compararContrasenias) {
    const payload = {
      idUsuario: usuarioExiste._id,
      rol: usuarioExiste.rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return {
      msg: "Usuario logueado",
      token,
      rol: usuarioExiste.rol,
      statusCode: 200,
    };
  }

  return {
    msg: "Usuario y/o contraseña incorrecto",
    statusCode: 400,
  };
};

const cerrarSesion = async () => {
  return {
    msg: "Sesión cerrada exitosamente",
    statusCode: 200,
  };
};

const bloquearUsuarioPorId = async (idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);
  usuario.bloqueado = true;
  await usuario.save();
  return {
    msg: "usuario bloqueado",
    statusCode: 200,
  };
};

const desbloquearUsuarioPorId = async (idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);
  usuario.bloqueado = false;
  await usuario.save();
  return {
    msg: "usuario habilitado",
    statusCode: 200,
  };
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesion,
  bloquearUsuarioPorId,
  desbloquearUsuarioPorId,
  cerrarSesion,
};
