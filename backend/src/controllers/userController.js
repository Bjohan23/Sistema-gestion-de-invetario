const Usuario = require("../models/Usuario");
const validExists = require("../utils/dbValidationHelper");
const { sendSuccess, sendError } = require("../utils/responseHelper");
const userService = require("../services/UserService");

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


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {descripcion, nombre} = req.body;
    const updatedUser = await userService.updateUser(id, {descripcion, nombre});
    return sendSuccess(res, updatedUser, "usuario actualizado con éxito");
  }catch(error){
    return sendError(res,500,error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    return sendSuccess(res, null, "Usuario eliminado con éxito");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
}
