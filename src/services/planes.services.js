const PlanesModel = require("../models/planes.schema");

const obtenerPlanes = async () => {
  const planes = await PlanesModel.find();

  return {
    planes,
    statusCode: 200,
  };
};

const obtenerPlan = async (idPlan) => {
  const plan = await PlanesModel.findOne({ _id: idPlan });

  return {
    plan,
    statusCode: 200,
  };
};

const crearPlan = async (body) => {
  const nuevoPlan = new PlanesModel(body);
  await nuevoPlan.save();
  console.log(nuevoPlan);

  return {
    msg: "Plan creado con exito",
    statusCode: 201,
  };
};

const actualizarPlan = async (body, idPlan) => {
  await PlanesModel.findByIdAndUpdate({ _id: idPlan }, body);

  return {
    msg: "Plan actualizado",
    statusCode: 200,
  };
};

const eliminarPlan = async (idPlan) => {
  await PlanesModel.findByIdAndDelete({ _id: idPlan });

  return {
    msg: "Plan eliminado",
    statusCode: 200,
  };
};

module.exports = {
  obtenerPlanes,
  obtenerPlan,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
};
