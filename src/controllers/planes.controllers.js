const serviciosPlanes = require("../services/planes.services");

const obtenerTodosLosPlanes = async (req, res) => {
  const result = await serviciosPlanes.obtenerPlanes();

  if (result.statusCode === 200) {
    res.status(200).json(result.planes);
  } else {
    res.status(500).json({ msg: "Error al traer los planes" });
  }
};

const obtenerUnPlan = async (req, res) => {
  const result = await serviciosPlanes.obtenerPlan(req.params.idPlan);

  if (result.statusCode === 200) {
    res.status(200).json(result.plan);
  } else {
    res.status(500).json({ msg: "Error al traer el plan" });
  }
};

const crearUnPlan = async (req, res) => {
  const result = await serviciosPlanes.crearPlan(req.body);

  if (result.statusCode === 201) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al crear el plan" });
  }
};

const actualizarUnPlan = async (req, res) => {
  const result = await serviciosPlanes.actualizarPlan(
    req.body,
    req.params.idPlan
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al actualizar el plan" });
  }
};

const eliminarUnPlan = async (req, res) => {
  const result = await serviciosPlanes.eliminarPlan(req.params.idPlan);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar el plan" });
  }
};

const habilitarPlan = async (req, res) => {
  const result = await serviciosPlanes.desbloquearPlanPorId(req.params.idPlan);
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al habilitar el plan" });
  }
};

const deshabilitarPlan = async (req, res) => {
  const result = await serviciosPlanes.bloquearPlanPorId(req.params.idPlan);
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al deshabilitar el plan" });
  }
};

const agregarUnInfoPlanUser = async (req, res) => {
  const result = await serviciosPlanes.agregarPlanInfoUser(
    req.params.idPlan,
    req.body
  );
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else if (result.statusCode === 404) {
    res.status(404).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar la informacion" });
  }
};

module.exports = {
  obtenerTodosLosPlanes,
  obtenerUnPlan,
  crearUnPlan,
  actualizarUnPlan,
  eliminarUnPlan,
  habilitarPlan,
  deshabilitarPlan,
  agregarUnInfoPlanUser,
};
