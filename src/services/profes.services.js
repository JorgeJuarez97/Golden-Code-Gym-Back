const ProfesModel = require("../models/profes.schema");

const obtenerProfes = async () => {
  const profes = await ProfesModel.find();

  return {
    profes,
    statusCode: 200,
  };
};

const obtenerProfe = async (idProfe) => {
  const profe = await ProfesModel.findOne({ _id: idProfe });

  return {
    profe,
    statusCode: 200,
  };
};

const crearProfe = async (body) => {
  const nuevoProfe = new ProfesModel(body);
  await nuevoProfe.save();
  console.log(nuevoProfe);

  return {
    msg: "Profesor creado con exito",
    statusCode: 201,
  };
};

const actualizarProfe = async (body, idProfe) => {
  await ProfesModel.findByIdAndUpdate({ _id: idProfe }, body);

  return {
    msg: "Profesor actualizado",
    statusCode: 200,
  };
};

const eliminarProfe = async (idProfe) => {
  await ProfesModel.findByIdAndDelete({ _id: idProfe });

  return {
    msg: "Profesor eliminado",
    statusCode: 200,
  };
};

module.exports = {
  obtenerProfes,
  obtenerProfe,
  crearProfe,
  actualizarProfe,
  eliminarProfe,
};
