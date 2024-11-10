const createRouter = require("../utils/routerFactory");
const usersController = require("../controllers/userController");

const routes = [
  { method: "get", path: "/", handler: usersController.getAllUsers },
  { method: "get", path: "/:id", handler: usersController.getUserById },
  { method: "post", path: "/", handler: usersController.registerUser },
  { method: "put", path: "/:id", handler: usersController.updateUser },
  // { method: 'delete', path: '/:id/:useridsession', handler: usersController.deleteUser },
];

module.exports = createRouter(routes);
