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

const updateCategoria = async (id, categoriaData) => {
  return await categoriaRepository.update(id, categoriaData);
};

const deleteCategoria = async (id) => {
  return await categoriaRepository.delete(id);
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  deleteCategoria,
  updateCategoria
};
