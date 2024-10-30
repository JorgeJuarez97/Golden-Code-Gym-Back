const CartModel = require("../models/carrito.schema");
const ProductModel = require("../models/productos.schema");
const UsersModel = require("../models/usuarios.schema");

const obtenerProductos = async () => {
  const productos = await ProductModel.find();
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
    productoExiste.cantidad += cantidad;
    await carrito.save();
    return {
      msg: "Producto agregado con exito",
      statusCode: 200,
    };
  }

  carrito.productos.push({
    ...producto,
    cantidad,
  });

  await carrito.save();

  return {
    msg: "Producto agregado con exito",
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

  carrito.productos.splice(posicionCarrito, 1);
  await carrito.save();

  return {
    msg: "Producto eliminado del carrito",
    statusCode: 200,
  };
};

const obtenerTodosLosProductosCarritoUsuario = async (idUsuario) => {
  const usuario = await UsersModel.findById(idUsuario);
  const carrito = await CartModel.findOne({ _id: usuario.idCarrito });

  return {
    productos: carrito.productos,
    statusCode: 200,
  };
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  nuevoProducto,
  actualizarProducto,
  eliminarProducto,
  cargarProductoCarrito,
  eliminarProductoCarrito,
  obtenerTodosLosProductosCarritoUsuario,
};
