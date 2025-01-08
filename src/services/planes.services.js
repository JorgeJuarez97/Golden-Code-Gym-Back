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

const bloquearPlanPorId = async (idPlan) => {
  const plan = await PlanesModel.findById(idPlan);
  plan.bloqueado = true;
  await plan.save();
  return {
    msg: "Plan bloqueado",
    statusCode: 200,
  };
};

const desbloquearPlanPorId = async (idPlan) => {
  const plan = await PlanesModel.findById(idPlan);
  plan.bloqueado = false;
  await plan.save();
  return {
    msg: "Plan habilitado",
    statusCode: 200,
  };
};

const agregarPlanInfoUser = async (idPlan, body) => {
  const plan = await PlanesModel.findById(idPlan);
  const { nombre, apellido, emailUsuario } = body;

  if (!plan) {
    return {
      msg: "Plan no encontrado",
      statusCode: 404,
    };
  }

  const infoUserExiste = plan.infoPlanUser.find(
    (info) => info.emailUsuario === emailUsuario
  );

  if (infoUserExiste) {
    return {
      msg: "Ya enviaste una solicitud",
      statusCode: 400,
    };
  }

  plan.infoPlanUser.push({
    nombre,
    apellido,
    emailUsuario,
  });

  await plan.save();

  return {
    msg: "Informacion agregada con exito",
    statusCode: 200,
  };
};

const eliminarPlanInfoUser = async (idPlan, emailUsuario) => {
  const plan = await PlanesModel.findById(idPlan);

  const posicionInfoUser = plan.infoPlanUser.findIndex(
    (p) => p?.emailUsuario === emailUsuario
  );

  if (posicionInfoUser === -1) {
    return {
      msg: "Usuario no encontrado en la lista de planes",
      statusCode: 404,
    };
  }

  plan.infoPlanUser.splice(posicionInfoUser, 1);
  await plan.save();

  return {
    msg: "Datos eliminados del plan",
    statusCode: 200,
  };
};

module.exports = {
  obtenerPlanes,
  obtenerPlan,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
  bloquearPlanPorId,
  desbloquearPlanPorId,
  agregarPlanInfoUser,
  eliminarPlanInfoUser,
};
