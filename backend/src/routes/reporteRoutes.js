const createRouter = require("../utils/routerFactory");
const reporteController = require("../controllers/reporteController");

const routes = [
  { method: "get", path: "/", handler: reporteController.getAllReportes },
  { method: "get", path: "/:id", handler: reporteController.getReporteById },
  { method: "post", path: "/", handler: reporteController.createReporte },
  { method: "put", path: "/:id", handler: reporteController.updateReporte },
  { method: 'delete', path: '/:id', handler: reporteController.deleteReporte },
];

module.exports = createRouter(routes);
