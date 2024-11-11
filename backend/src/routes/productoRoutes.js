const createRouter = require("../utils/routerFactory");
const productController = require("../controllers/productController");

const routes = [
  { method: "get", path: "/", handler: productController.getAllProducts },
  { method: "get", path: "/:id", handler: productController.getProductById },
  { method: "post", path: "/", handler: productController.registerProduct},
  { method: "put", path: "/:id", handler: productController.updateProduct },
  { method: "delete", path: "/:id", handler: productController.deleteProduct },
  
];
  
module.exports = createRouter(routes);
