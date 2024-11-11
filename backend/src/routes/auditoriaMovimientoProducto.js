const createRouter = require("../utils/routerFactory");
const auditoriaMovimientoProducto = require("../controllers/AuditoriaMovimientoProductoController");

const routes = [
    { method: "get", path: "/", handler: auditoriaMovimientoProducto.getAllAuditorias},
    { method: "get", path: "/:id", handler: auditoriaMovimientoProducto.getAuditoriaById},
    { method: "post", path: "/", handler: auditoriaMovimientoProducto.createAuditoria},
    { method: "put", path: "/:id", handler: auditoriaMovimientoProducto.updateAuditoria},
    { method: "delete", path: "/:id", handler: auditoriaMovimientoProducto.deleteAuditoria},
];

module.exports = createRouter(routes);
