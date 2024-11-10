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

// Controlador para registrar un producto
exports.registerProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    const newProduct = await productService.createProduct({ name, price });
    return sendSuccess(res, newProduct, "Producto registrado con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al registrar el producto: " + error.message);
  }
};
