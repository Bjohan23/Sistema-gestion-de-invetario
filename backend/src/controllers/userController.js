const Usuario = require("../models/Usuario");
const validExists = require("../utils/dbValidationHelper");
const { sendSuccess, sendError } = require("../utils/responseHelper");
const userService = require("../services/userService");

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return sendSuccess(res, users);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return sendSuccess(res, user);
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación: Verifica si el nombre de usuario ya existe
    const userExists = await validExists(Usuario, "username", username);
    if (userExists) {
      return sendError(res, 400, "El nombre de usuario ya está registrado");
    }

    // Continuar con la creación del usuario
    const newUser = await Usuario.create({ username, password });
    sendSuccess(res, newUser, "Usuario registrado con éxito");
  } catch (error) {
    sendError(res, 500, "Error al registrar el usuario");
  }
};
