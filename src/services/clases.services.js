const UsersModel = require("../models/usuarios.schema");
const ClasesModel = require("../models/clases.schema");

const obtenerClases = async () => {
  const clases = await ClasesModel.find();
  return {
    clases,
    statusCode: 200,
  };
};

const obtenerClase = async (idClase) => {
  const clase = await ClasesModel.findOne({ _id: idClase });
  return {
    clase,
    statusCode: 200,
  };
};

const nuevaClase = async (body) => {
  const nuevaClase = new ClasesModel(body);
  await nuevaClase.save();
  console.log(nuevaClase);

  return {
    msg: "Clase creada con exito",
    statusCode: 201,
  };
};

const actualizarClase = async (body, idClase) => {
  const claseActualizada = await ClasesModel.findByIdAndUpdate(
    { _id: idClase },
    body
  );

  return {
    msg: "Clase actualizada",
    statusCode: 200,
  };
};

const eliminarClase = async (idClase) => {
  await ClasesModel.findByIdAndDelete({ _id: idClase });

  return {
    msg: "Clase eliminada",
    statusCode: 200,
  };
};

const reservarClase = async (idUsuario, idClase) => {
  const usuario = await UsersModel.findById(idUsuario);
  const clase = await ClasesModel.findById(idClase);

  if (!usuario) {
    return {
      msg: "Usuario no encontrado",
      statusCode: 404,
    };
  }

  if (!clase) {
    console.log("Clase no encontrada");
    return {
      msg: "Clase no encontrada",
      statusCode: 404,
    };
  }

  const usuarioReservado = clase.usuariosReservados.find(
    (reservado) => reservado?._id.toString() === idUsuario.toString()
  );

  if (usuarioReservado) {
    return {
      msg: "Ya reservaste un cupo para esta clase",
      statusCode: 404,
    };
  }

  if (clase.cuposPorDia > 0) {
    clase.usuariosReservados.push(usuario);
    clase.cuposPorDia -= 1;
    await clase.save();

    return {
      msg: "Cupo reservado",
      statusCode: 200,
    };
  }

  return {
    msg: "No hay cupos disponibles",
    statusCode: 404,
  };
};

const eliminarReservarClase = async (idUsuario, idClase) => {
  const usuario = await UsersModel.findById(idUsuario);
  const clase = await ClasesModel.findById(idClase);

  if (!usuario) {
    return {
      msg: "Usuario no encontrado",
      statusCode: 404,
    };
  }

  if (!clase) {
    console.log("Clase no encontrada");
    return {
      msg: "Clase no encontrada",
      statusCode: 404,
    };
  }

  const posicionUsuario = clase.usuariosReservados.findIndex(
    (userId) => userId?._id.toString() === idUsuario.toString()
  );

  if (posicionUsuario === -1) {
    return {
      msg: "Usuario no tiene reserva para esta clase",
      statusCode: 404,
    };
  }

  clase.usuariosReservados.splice(posicionUsuario, 1);
  clase.cuposPorDia += 1;
  await clase.save();

  return {
    msg: "Reserva eliminada",
    statusCode: 200,
  };
};

const bloquearClasePorId = async (idClase) => {
  const clase = await ClasesModel.findById(idClase);
  clase.bloqueado = true;
  await clase.save();
  return {
    msg: "Clase bloqueada",
    statusCode: 200,
  };
};

const desbloquearClasePorId = async (idClase) => {
  const clase = await ClasesModel.findById(idClase);
  clase.bloqueado = false;
  await clase.save();
  return {
    msg: "Clase habilitada",
    statusCode: 200,
  };
};

const agregarImagen = async (idClase, file) => {
  const clase = await ClasesModel.findById(idClase);
  const imagen = await cloudinary.uploader.upload(file.path);
  clase.imagen = imagen.url;

  await clase.save();

  return {
    msg: "Imagen cargada",
    statusCode: 200,
  };
};

module.exports = {
  obtenerClases,
  obtenerClase,
  actualizarClase,
  nuevaClase,
  eliminarClase,
  reservarClase,
  eliminarReservarClase,
  bloquearClasePorId,
  desbloquearClasePorId,
  agregarImagen,
};
