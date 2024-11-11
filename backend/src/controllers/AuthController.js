const AuthService = require("../services/AuthService");
const Usuario = require("../models/Usuario");
const { sendSuccess, sendError } = require("../utils/responseHelper");
const validExists = require("../utils/dbValidationHelper");
const userService = require("../services/UserService");


exports.registerUser = async (req, res) => {
  try {
    const { username, password , rol } = req.body;

    // Validación: Verifica si el nombre de usuario ya existe
    const userExists = await validExists(Usuario, "username", username);
    if (userExists) {
      return sendError(res, 400, "El nombre de usuario ya está registrado");
    }

    // Continuar con la creación del usuario
    const newUser = await userService.createUser({ username, password, rol });
    sendSuccess(res, newUser, "Usuario registrado con éxito");
  } catch (error) {
    sendError(res, 500, "Error al registrar el usuario");
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, rol, token } = await AuthService.login(username, password);
    sendSuccess(res, { user, rol, token }, "Inicio de sesión exitoso");
  } catch (error) {
    sendError(res, 400, error.message);
  }
};
