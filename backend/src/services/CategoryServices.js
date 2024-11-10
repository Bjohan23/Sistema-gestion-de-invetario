const categoriaRepository = require('../repositories/CategoriaRepository');

const getAllCategorias = async () => {
  return await categoriaRepository.findAll();
};

const getCategoriaById = async (id) => {
  return await categoriaRepository.findById(id);
};

const createCategoria = async (categoriaData) => {
  return await categoriaRepository.create(categoriaData);
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
};
