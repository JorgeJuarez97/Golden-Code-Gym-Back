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
    res.status(201).json({ msg: result.msg, nuevaClase: result.nuevaClase });
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
  const result = await serviciosClases.eliminarClase(req.params.idClase);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar el producto" });
  }
};

const reservarUnaClase = async (req, res) => {
  const result = await serviciosClases.reservarClase(
    req.idUsuario,
    req.params.idClase
  );

  if (result.statusCode === 200) {
    res
      .status(200)
      .json({ msg: result.msg, reservaActiva: result.reservaActiva });
  } else if (result.statusCode === 404) {
    res.status(404).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al reservar clase" });
  }
};

const eliminarReservarUnaCLase = async (req, res) => {
  const result = await serviciosClases.eliminarReservarClase(
    req.idUsuario,
    req.params.idClase
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 404) {
    res.status(404).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar reserva" });
  }
};

const eliminarReservarUnaCLaseAdmin = async (req, res) => {
  const result = await serviciosClases.eliminarReservarClase(
    req.body.idUsuario,
    req.params.idClase
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 404) {
    res.status(404).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar reserva" });
  }
};

const habilitarClase = async (req, res) => {
  const result = await serviciosClases.desbloquearClasePorId(
    req.params.idClase
  );
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al habilitar la clase" });
  }
};

const deshabilitarClase = async (req, res) => {
  const result = await serviciosClases.bloquearClasePorId(req.params.idClase);
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al deshabilitar la clase" });
  }
};

const agregarImagenClase = async (req, res) => {
  const result = await serviciosClases.agregarImagen(
    req.params.idClase,
    req.file
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar la imagen a la clase" });
  }
};

const verificarUnaReserva = async (req, res) => {
  const result = await serviciosClases.verificarReserva(
    req.idUsuario,
    req.params.idClase
  );

  if (result.statusCode === 200) {
    res
      .status(200)
      .json({ msg: result.msg, reservaActiva: result.reservaActiva });
  } else if (result.statusCode === 404) {
    res.status(404).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al verificar reserva" });
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
  habilitarClase,
  deshabilitarClase,
  agregarImagenClase,
  verificarUnaReserva,
  eliminarReservarUnaCLaseAdmin,
};
