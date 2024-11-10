const createRouter = require("../utils/routerFactory");
const usersController = require("../controllers/categoryController");

const routes = [
  { method: "get", path: "/", handler: usersController.getAllCategories },
  { method: "get", path: "/:id", handler: usersController.getCategoryById },
  { method: "post", path: "/", handler: usersController.registerCategory },
  { method: "put", path: "/:id", handler: usersController.updateCategory },
  { method: "delete", path: "/:id", handler: usersController.deleteCategory },
  
];

// const routes = [
//     { method: "get", path: "/", handler: usersController.getAllUsers },
//     { method: "get", path: "/:id", handler: usersController.getUserById },
//     { method: "post", path: "/", handler: usersController.registerUser },
//     { method: "put", path: "/:id", handler: usersController.updateUser },
//     // { method: 'delete', path: '/:id/:useridsession', handler: usersController.deleteUser },
//   ];
  
module.exports = createRouter(routes);
