const CartModel = require("../models/carrito.schema");
const ProductModel = require("../models/productos.schema");
const UsersModel = require("../models/usuarios.schema");
const cloudinary = require("../helpers/cloudinary.config");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const obtenerProductos = async () => {
  const productos = await ProductModel.find();
  return {
    productos,
    statusCode: 200,
  };
};

const obtenerProductosPorTipo = async (tipoDeProducto) => {
  const productos = await ProductModel.find({ tipoDeProducto: tipoDeProducto });
  return {
    productos,
    statusCode: 200,
  };
};

const obtenerProducto = async (idProducto) => {
  const producto = await ProductModel.findOne({ _id: idProducto });
  return {
    producto,
    statusCode: 200,
  };
};

const nuevoProducto = async (body) => {
  const nuevoProducto = new ProductModel(body);
  await nuevoProducto.save();
  console.log(nuevoProducto);

  return {
    msg: "Producto creado con exito",
    statusCode: 201,
  };
};

const actualizarProducto = async (body, idProducto) => {
  const productoActualizado = await ProductModel.findByIdAndUpdate(
    { _id: idProducto },
    body
  );

  return {
    msg: "Producto actualizado",
    statusCode: 200,
  };
};

const eliminarProducto = async (idProducto) => {
  await ProductModel.findByIdAndDelete({ _id: idProducto });

  return {
    msg: "Producto eliminado",
    statusCode: 200,
  };
};

const cargarProductoCarrito = async (idUsuario, idProducto) => {
  const usuario = await UsersModel.findById(idUsuario);
  const producto = await ProductModel.findById(idProducto);
  const carrito = await CartModel.findOne({ _id: usuario.idCarrito });
  const cantidad = 1;

  const productoExiste = carrito.productos.find(
    (prod) => prod?._id.toString() === idProducto.toString()
  );

  if (productoExiste) {
    return {
      msg: "Producto ya existe en carrito",
      statusCode: 200,
    };
  }

  carrito.productos.push({
    _id: producto._id,
    tipoDeProducto: producto.tipoDeProducto,
    nombreProducto: producto.nombreProducto,
    precio: producto.precio * cantidad,
    descripcion: producto.descripcion,
    imagen: producto.imagen,
    cantidad: cantidad,
  });

  await carrito.save();

  return {
    msg: "Producto agregado con exito",
    statusCode: 200,
  };
};

const actualizarProductoCarrito = async (idUsuario, idProducto) => {
  const usuario = await UsersModel.findById(idUsuario);
  const producto = await ProductModel.findById(idProducto);
  const carrito = await CartModel.findOne({ _id: usuario.idCarrito });

  const productoExiste = carrito.productos.find(
    (prod) => prod?._id.toString() === idProducto.toString()
  );

  if (productoExiste) {
    productoExiste.cantidad += 1;
  }

  carrito.markModified("productos");

  await carrito.save();
  return {
    msg: "Se actualizo la cantidad del producto",
    statusCode: 200,
  };
};

const eliminarProductoCarrito = async (idUsuario, idProducto) => {
  const usuario = await UsersModel.findById(idUsuario);
  const producto = await ProductModel.findById(idProducto);
  const carrito = await CartModel.findOne({ _id: usuario.idCarrito });

  const posicionCarrito = carrito.productos.findIndex(
    (prod) => prod?._id.toString() === idProducto.toString()
  );

  if (posicionCarrito === -1) {
    return {
      msg: "Producto no encontrado en el carrito",
      statusCode: 404,
    };
  }

  carrito.productos.splice(posicionCarrito, 1);
  await carrito.save();

  return {
    msg: "Producto eliminado del carrito",
    statusCode: 200,
  };
};

const obtenerTodosLosProductosCarritoUsuario = async (idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);
  const carrito = await CartModel.findById({ _id: usuario.idCarrito });

  return {
    productos: carrito.productos,
    statusCode: 200,
  };
};

const agregarImagen = async (idProducto, file) => {
  const producto = await ProductModel.findById(idProducto);
  const imagen = await cloudinary.uploader.upload(file.path);
  producto.imagen = imagen.url;

  await producto.save();

  return {
    msg: "Imagen cargada",
    statusCode: 200,
  };
};

const pagarMercadoPago = async (idUsuario) => {
  const cliente = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });
  const usuario = await UsersModel.findById(idUsuario);
  const carrito = await CartModel.findById({ _id: usuario.idCarrito });

  const items = [
    {
      title: carrito.productos
        .map((producto) => `${producto.nombreProducto} x${producto.cantidad}`)
        .join(", "),
      quantity: 1,
      unit_price: carrito.productos.reduce(
        (acc, prod) => acc + prod.precio * prod.cantidad,
        0
      ),
      currency_id: "ARS",
    },
  ];

  const preference = new Preference(cliente);

  const result = await preference.create({
    body: {
      items: items,
      back_urls: {
        success: "frontend/carrito/secces",
        failure: "frontend/carrito/failure",
        pending: "frontend/carrito/pending",
      },
      auto_return: "approved",
    },
  });

  console.log(result);

  return {
    url: result.init_point,
    statusCode: 200,
  };
};

const bloquearProductoPorId = async (idProducto) => {
  const producto = await ProductModel.findById(idProducto);
  producto.bloqueado = true;
  await producto.save();
  return {
    msg: "Producto bloqueado",
    statusCode: 200,
  };
};

const desbloquearProductoPorId = async (idProducto) => {
  const producto = await ProductModel.findById(idProducto);
  producto.bloqueado = false;
  await producto.save();
  return {
    msg: "Producto habilitado",
    statusCode: 200,
  };
};

module.exports = {
  obtenerProductos,
  obtenerProductosPorTipo,
  obtenerProducto,
  nuevoProducto,
  actualizarProducto,
  eliminarProducto,
  cargarProductoCarrito,
  eliminarProductoCarrito,
  obtenerTodosLosProductosCarritoUsuario,
  actualizarProductoCarrito,
  agregarImagen,
  pagarMercadoPago,
  bloquearProductoPorId,
  desbloquearProductoPorId,
};
