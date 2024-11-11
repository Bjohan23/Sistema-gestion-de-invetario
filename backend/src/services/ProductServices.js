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

const updateProducto = async (id, productoData) => {
  return await productoRepository.update(id, productoData);
}

const deleteProducto = async (id) => {
  return await productoRepository.delete(id);
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
