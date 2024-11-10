const { sendSuccess, sendError } = require("../utils/responseHelper");
const productService = require("../services/ProductServices");

// Controlador para obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return sendSuccess(res, products);
  } catch (error) {
    return sendError(res, 500, "Error al obtener los productos: " + error.message);
  }
};

// Controlador para obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return sendError(res, 404, "Producto no encontrado");
    }

    return sendSuccess(res, product);
  } catch (error) {
    return sendError(res, 500, "Error al obtener el producto: " + error.message);
  }
};


exports.registerProduct = async (req, res) => {
  try {
    const { categoria_id, nombre, descripcion,precio,stock } = req.body;

    const newProduct = await productService.createProducto({ categoria_id, nombre,descripcion, precio, stock });
    return sendSuccess(res, newProduct, "Producto registrado con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al registrar el producto: " + error.message);
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria_id, nombre, descripcion, precio, stock } = req.body;

    const updatedProduct = await productService.updateProduct(id, { categoria_id, nombre, descripcion, precio, stock });
    
    if (!updatedProduct) {
      return sendError(res, 404, "Producto no encontrado");
    }

    return sendSuccess(res, updatedProduct, "Producto actualizado con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al actualizar el producto: " + error.message);
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productService.deleteProduct(id);
    
    if (!deletedProduct) {
      return sendError(res, 404, "Producto no encontrado");
    }

    return sendSuccess(res, null, "Producto eliminado con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al eliminar el producto: " + error.message);
  }
};