const express = require("express");
const AuthController = require("../controllers/AuthController");
const usuarioRoutes = require("./usuarioRoutes");
const authMiddleware = require("../middlewares/authMiddleware");

const authRoutes = require("./authRoutes");
const router = express.Router();

// rutas publicas
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Rutas públicas (no requieren autenticación)
router.use("/auth", authRoutes);
// Middleware de autenticación para rutas protegidas
router.use(authMiddleware);

// Rutas protegidas
router.use("/usuarios", usuarioRoutes);

module.exports = router;
