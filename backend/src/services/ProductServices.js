const productoRepository = require('../repositories/ProductoRepository');

const getAllProductos = async () => {
  return await productoRepository.findAll();
};

const getProductoById = async (id) => {
  return await productoRepository.findById(id);
};

const createProducto = async (productoData) => {
  return await productoRepository.create(productoData);
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
};
