const serviciosProductos = require("../services/productos.services");

const obtenerTodosLosProductos = async (req, res) => {
  const result = await serviciosProductos.obtenerProductos();

  if (result.statusCode === 200) {
    res.status(200).json(result.productos);
  } else {
    res.status(500).json({ msg: "Error al traer los productos" });
  }
};

const obtenerTodosLosProductosPorTipo = async (req, res) => {
  const result = await serviciosProductos.obtenerProductosPorTipo(
    req.params.tipoDeProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json(result.productos);
  } else {
    res.status(500).json({ msg: "Error al traer los productos" });
  }
};

const obtenerUnProducto = async (req, res) => {
  const result = await serviciosProductos.obtenerProducto(
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json(result.producto);
  } else {
    res.status(500).json({ msg: "Error al traer el producto" });
  }
};

const crearUnProducto = async (req, res) => {
  const result = await serviciosProductos.nuevoProducto(req.body);

  if (result.statusCode === 201) {
    res
      .status(201)
      .json({ msg: result.msg, nuevoProducto: result.nuevoProducto });
  } else {
    res.status(500).json({ msg: "Error al crear el producto" });
  }
};

const actualizarUnProducto = async (req, res) => {
  const result = await serviciosProductos.actualizarProducto(
    req.body,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al actualizar el producto" });
  }
};

const eliminarUnProducto = async (req, res) => {
  const result = await serviciosProductos.eliminarProducto(
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar el producto" });
  }
};

const agregarUnProductoAlCarrito = async (req, res) => {
  const result = await serviciosProductos.cargarProductoCarrito(
    req.idUsuario,
    req.params.idProducto,
    req.body
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al cargar el producto en el carrito" });
  }
};

const eliminarUnProductoDelCarrito = async (req, res) => {
  const result = await serviciosProductos.eliminarProductoCarrito(
    req.idUsuario,
    req.params.idProducto
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else if (result.statusCode === 404) {
    res.status(404).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar el producto del carrito" });
  }
};

const obtenerProductosCarrito = async (req, res) => {
  const result =
    await serviciosProductos.obtenerTodosLosProductosCarritoUsuario(
      req.idUsuario
    );

  if (result.statusCode === 200) {
    res.status(200).json({ productos: result.productos });
  } else {
    res
      .status(500)
      .json({ msg: "Error al obtener todos los productos del carrito" });
  }
};

const agregarImagenProducto = async (req, res) => {
  const result = await serviciosProductos.agregarImagen(
    req.params.idProducto,
    req.file
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al agregar la imagen al producto" });
  }
};

const pagarProductos = async (req, res) => {
  const result = await serviciosProductos.pagarMercadoPago(req.idUsuario);

  if (result.statusCode === 200) {
    res.status(200).json({ url: result.url });
  } else {
    res.status(500).json({ msg: "Error al realizar pago" });
  }
};

const habilitarProducto = async (req, res) => {
  const result = await serviciosProductos.desbloquearProductoPorId(
    req.params.idProducto
  );
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al habilitar el producto" });
  }
};

const deshabilitarProducto = async (req, res) => {
  const result = await serviciosProductos.bloquearProductoPorId(
    req.params.idProducto
  );
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al deshabilitar el producto" });
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerTodosLosProductosPorTipo,
  obtenerUnProducto,
  crearUnProducto,
  actualizarUnProducto,
  eliminarUnProducto,
  agregarUnProductoAlCarrito,
  eliminarUnProductoDelCarrito,
  obtenerProductosCarrito,
  agregarImagenProducto,
  pagarProductos,
  habilitarProducto,
  deshabilitarProducto,
};
