const UsersModel = require("../models/usuarios.schema");
const ClasesModel = require("../models/clases.schema");

const obtenerClases = async () => {
  const productos = await ClasesModel.find();
  return {
    clases,
    statusCode: 200,
  };
};

const obtenerClase = async (idClase) => {
  const producto = await ClasesModel.findOne({ _id: idClase });
  return {
    clases,
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

const reservarClase = async (idClase, idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);
  const clase = await ClasesModel.findById(idClase);

  const claseExiste = clase.find(
    (clas) => clas?._id.toString() === idClase.toString()
  );

  if (claseExiste && clase.cuposPorDia != 0) {
    clase.usuariosReservados.push({ usuario, dia });
    clase.cuposPorDia -= 1;
    await clase.save();
    return {
      msg: "Cupo reservado",
      statusCode: 200,
    };
  }

  return {
    msg: "No hay cupos disponibles",
    statusCode: 400,
  };
};

const eliminarReservarClase = async (idClase, idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);
  const clase = await ClasesModel.findById(idClase);

  const claseExiste = clase.find(
    (clas) => clas?._id.toString() === idClase.toString()
  );

  const posicionUsuario = usuario.findIndex(
    (user) => user?._id.toString() === idUsuario.toString()
  );

  claseExiste.usuariosReservados.splice(posicionUsuario, 1);
  claseExiste.cuposPorDia += 1;
  await clase.save();

  return {
    msg: "Reserva eliminada",
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
};
