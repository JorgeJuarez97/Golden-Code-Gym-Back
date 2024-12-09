const serviciosProfes = require("../services/profes.services");

const obtenerTodosLosProfes = async (req, res) => {
  const result = await serviciosProfes.obtenerProfes();

  if (result.statusCode === 200) {
    res.status(200).json(result.profes);
  } else {
    res.status(500).json({ msg: "Error al traer los profesores" });
  }
};

const obtenerUnProfe = async (req, res) => {
  const result = await serviciosProfes.obtenerProfe(req.params.idProfe);

  if (result.statusCode === 200) {
    res.status(200).json(result.profe);
  } else {
    res.status(500).json({ msg: "Error al traer el profesor" });
  }
};

const crearUnProfe = async (req, res) => {
  const result = await serviciosProfes.crearProfe(req.body);

  if (result.statusCode === 201) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al crear el profesor" });
  }
};

const actualizarUnProfe = async (req, res) => {
  const result = await serviciosProfes.actualizarProfe(
    req.body,
    req.params.idProfe
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al actualizar el profesor" });
  }
};

const eliminarUnProfe = async (req, res) => {
  const result = await serviciosProfes.eliminarProfe(req.params.idProfe);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar el profesor" });
  }
};

const agregarImagenProfe = async (req, res) => {
  const result = await serviciosProfes.agregarImagen(
    req.params.idProfe,
    req.file
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar la imagen al profesor" });
  }
};

const habilitarProfe = async (req, res) => {
  const result = await serviciosProfes.desbloquearProfePorId(
    req.params.idProfe
  );
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al habilitar al profesor" });
  }
};

const deshabilitarProfe = async (req, res) => {
  const result = await serviciosProfes.bloquearProfePorId(req.params.idProfe);
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al deshabilitar al profesor" });
  }
};

module.exports = {
  obtenerTodosLosProfes,
  obtenerUnProfe,
  crearUnProfe,
  actualizarUnProfe,
  eliminarUnProfe,
  agregarImagenProfe,
  habilitarProfe,
  deshabilitarProfe,
};
