const serviciosClases = require("../services/clases.services");

const obtenerTodasLasClases = async (req, res) => {
  const result = await serviciosClases.obtenerClases();

  if (result.statusCode === 200) {
    res.status(200).json(result.clases);
  } else {
    res.status(500).json({ msg: "Error al traer las clases" });
  }
};

const obtenerUnaClase = async (req, res) => {
  const result = await serviciosClases.obtenerClase(req.params.idClase);

  if (result.statusCode === 200) {
    res.status(200).json(result.clase);
  } else {
    res.status(500).json({ msg: "Error al traer la clase" });
  }
};

const crearUnaClase = async (req, res) => {
  const result = await serviciosClases.nuevaClase(req.body);

  if (result.statusCode === 201) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al crear la clase" });
  }
};

const actualizarUnaClase = async (req, res) => {
  const result = await serviciosClases.actualizarClase(
    req.body,
    req.params.idClase
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al actualizar la clase" });
  }
};

const eliminarUnaClase = async (req, res) => {
  const result = await serviciosClases.eliminarClase(req.params.idProducto);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar el producto" });
  }
};

const reservarUnaClase = async (req, res) => {
  const result = await serviciosClases.reservarClase(
    req.body,
    req.params.idClase
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 400) {
    res.status(500).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al reservar clase" });
  }
};

const eliminarReservarUnaCLase = async (req, res) => {
  const result = await serviciosClases.eliminarReservarClase(
    req.body,
    req.params.idClase
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al reservar clase" });
  }
};

module.exports = {
  obtenerTodasLasClases,
  obtenerUnaClase,
  crearUnaClase,
  actualizarUnaClase,
  eliminarUnaClase,
  reservarUnaClase,
  eliminarReservarUnaCLase,
};
