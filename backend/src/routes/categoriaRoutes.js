const createRouter = require("../utils/routerFactory");
const usersController = require("../controllers/categoryController");

const routes = [
  { method: "get", path: "/", handler: usersController.getAllCategories },
  { method: "get", path: "/:id", handler: usersController.getCategoryById },
  { method: "post", path: "/", handler: usersController.registerCategory },
  { method: "put", path: "/:id", handler: usersController.updateCategory },
  { method: "delete", path: "/:id", handler: usersController.deleteCategory },
  
];

  
module.exports = createRouter(routes);
