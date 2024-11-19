// Importamos los módulos necesarios.
const express = require("express");

// Importamos controladores y archivos de rutas específicos.
const AuthController = require("../controllers/AuthController"); // Controlador de autenticación.
const usuarioRoutes = require("./usuarioRoutes"); // Rutas relacionadas con usuarios.
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware de autenticación.
const categoriaRoutes = require("./categoriaRoutes"); // Rutas relacionadas con categorías.
const productoRoutes = require("./productoRoutes"); // Rutas relacionadas con productos.
const reportesRoutes = require("./reporteRoutes"); // Rutas relacionadas con reportes.
const auditoriaProductoRoutes = require("./auditoriaProductoRoutes"); // Rutas de auditoría de productos.
const movimientosInventarioRoutes = require("./movimientosInventarioRoutes"); // Rutas de movimientos de inventario.
const authRoutes = require("./authRoutes"); // Rutas adicionales de autenticación.

const router = express.Router(); // Creamos un nuevo enrutador de Express.

// **Rutas públicas**: Estas rutas no requieren autenticación.
router.post("/login", AuthController.login); // Ruta para iniciar sesión.
router.post("/register", AuthController.registerUser); // Ruta para registrar un nuevo usuario.

// Rutas públicas adicionales agrupadas en `/auth`.
router.use("/auth", authRoutes);

// **Middleware de autenticación**: 
// Todas las rutas registradas después de esta línea estarán protegidas y requerirán un token válido.
router.use(authMiddleware);

// **Rutas protegidas**: 
// Estas rutas solo son accesibles si el usuario está autenticado.
router.use("/usuarios", usuarioRoutes); // Rutas para manejar usuarios.
router.use("/categorias", categoriaRoutes); // Rutas para manejar categorías.
router.use("/productos", productoRoutes); // Rutas para manejar productos.
router.use("/reportes", reportesRoutes); // Rutas para generar y consultar reportes.
router.use("/auditoriaproducto", auditoriaProductoRoutes); // Rutas para manejar auditorías de productos.
router.use("/movimientoinventario", movimientosInventarioRoutes); // Rutas para registrar movimientos de inventario.

// Exportamos el enrutador configurado para ser usado en la aplicación principal.
module.exports = router;
