const express = require("express");
const AuthController = require("../controllers/AuthController");
const usuarioRoutes = require("./usuarioRoutes");
const authMiddleware = require("../middlewares/authMiddleware");
const categoriaRoutes = require("./categoriaRoutes");
const productoRoutes = require("./productoRoutes");

const authRoutes = require("./authRoutes");
const router = express.Router();

// rutas publicas
router.post("/login", AuthController.login);

// Rutas públicas (no requieren autenticación)
router.use("/auth", authRoutes);
// Middleware de autenticación para rutas protegidas
router.use(authMiddleware);

// Rutas protegidas
router.use("/usuarios", usuarioRoutes);
router.use("/categorias", categoriaRoutes)
router.use("/productos", productoRoutes);
module.exports = router;
