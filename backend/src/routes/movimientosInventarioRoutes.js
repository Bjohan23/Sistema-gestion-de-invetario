const createRouter = require("../utils/routerFactory");
const movimientosInventarioController = require("../controllers/MovimientosInventarioController");

const routes = [
    { method: "get", path: "/", handler: movimientosInventarioController.getAllMovimientos },
    { method: "get", path: "/:id", handler: movimientosInventarioController.getMovimientoById },
    { method: "post", path: "/", handler: movimientosInventarioController.createMovimiento },
    { method: "put", path: "/:id", handler: movimientosInventarioController.updateMovimiento },
    { method: "delete", path: "/:id", handler: movimientosInventarioController.deleteMovimiento },
];

module.exports = createRouter(routes);
