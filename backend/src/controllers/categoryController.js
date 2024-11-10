const { sendSuccess, sendError } = require("../utils/responseHelper");
const categoryService = require("../services/CategoryServices");

// Controlador para obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategorias();
    return sendSuccess(res, categories);
  } catch (error) {
    return sendError(res, 500, "Error al obtener las categorías: " + error.message);
  }
};

// Controlador para obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoriaById(id);

    if (!category) {
      return sendError(res, 404, "Categoría no encontrada");
    }

    return sendSuccess(res, category);
  } catch (error) {
    return sendError(res, 500, "Error al obtener la categoría: " + error.message);
  }
};

// Controlador para registrar una categoría
exports.registerCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = await categoryService.createCategoria({ name, description });
    return sendSuccess(res, newCategory, "Categoría registrada con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al registrar la categoría: " + error.message);
  }
};

// Controlador para actualizar una categoría
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre,descripcion } = req.body;

    const updatedCategory = await categoryService.updateCategoria(id, { nombre,descripcion });
    return sendSuccess(res, updatedCategory, "Categoría actualizada con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al actualizar la categoría: " + error.message);
  }
};

// Controlador para eliminar una categoría
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await categoryService.deleteCategoria(id);
    if (!deletedCategory) {
      return sendError(res, 404, "Categoría no encontrada");
    }

    return sendSuccess(res, null, "Categoría eliminada con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al eliminar la categoría: " + error.message);
  }
};
