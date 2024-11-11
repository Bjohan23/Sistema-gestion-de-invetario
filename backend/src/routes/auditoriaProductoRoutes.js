const createRouter = require("../utils/routerFactory");
const auditoriaProductoController = require("../controllers/AuditoriaProductoController");

const routes = [
    { method: "get", path: "/", handler: auditoriaProductoController.getAllAuditoriaProductos },
    { method: "get", path: "/:id", handler: auditoriaProductoController.getAuditoriaProductoById },
    { method: "post", path: "/", handler: auditoriaProductoController.createAuditoriaProducto },
    { method: "put", path: "/:id", handler: auditoriaProductoController.updateAuditoriaProducto },
    { method: "delete", path: "/:id", handler: auditoriaProductoController.deleteAuditoriaProducto },
];

module.exports = createRouter(routes);
