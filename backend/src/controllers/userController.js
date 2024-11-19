// Importamos el modelo de Usuario, que representa la entidad en la base de datos.
const Usuario = require("../models/Usuario");

// Helper para validar si un registro existe en la base de datos.
const validExists = require("../utils/dbValidationHelper");

// Helpers para enviar respuestas estandarizadas (éxito o error).
const { sendSuccess, sendError } = require("../utils/responseHelper");

// Servicio que contiene la lógica de negocio para los usuarios.
const userService = require("../services/UserService");

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    // Se obtiene la lista de usuarios utilizando el servicio correspondiente.
    const users = await userService.getAllUsers();

    // Se envía una respuesta exitosa con los datos de los usuarios.
    return sendSuccess(res, users);
  } catch (error) {
    // En caso de error, se envía una respuesta con el código de error y el mensaje correspondiente.
    return sendError(res, 500, error.message);
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    // Extraemos el ID del parámetro de la solicitud.
    const { id } = req.params;

    // Buscamos al usuario en la base de datos a través del servicio.
    const user = await userService.getUserById(id);

    // Si no se encuentra el usuario, enviamos un error 404.
    if (!user) {
      return sendError(res, 404, "Usuario no encontrado");
    }

    // Si se encuentra, enviamos una respuesta exitosa con los datos del usuario.
    return sendSuccess(res, user, "Usuario encontrado");
  } catch (error) {
    // En caso de error, se envía una respuesta con el mensaje de error.
    return sendError(res, 500, error.message);
  }
};

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  try {
    // Extraemos los datos necesarios del cuerpo de la solicitud.
    const { username, password, rol } = req.body;

    // Validación: Verificamos si el nombre de usuario ya está registrado.
    const userExists = await validExists(Usuario, "username", username);
    if (userExists) {
      return sendError(res, 400, "El nombre de usuario ya está registrado");
    }

    // Creamos el nuevo usuario utilizando el servicio.
    const newUser = await userService.createUser({ username, password, rol });

    // Enviamos una respuesta exitosa indicando que el usuario fue registrado.
    sendSuccess(res, newUser, "Usuario registrado con éxito");
  } catch (error) {
    // En caso de error, enviamos una respuesta con el mensaje de error.
    sendError(res, 500, "Error al registrar el usuario");
  }
};

// Controlador para actualizar un usuario existente
exports.updateUser = async (req, res) => {
  try {
    // Extraemos el ID del parámetro y los datos del cuerpo de la solicitud.
    const { id } = req.params;
    const { rol, username } = req.body;

    // Validación: Verificamos si el nombre de usuario ya está registrado.
    const userExists = await validExists(Usuario, "username", username);
    if (userExists) {
      return sendError(res, 400, "El nombre de usuario ya está registrado, no se puede actualizar");
    }

    // Actualizamos el usuario utilizando el servicio.
    const updatedUser = await userService.updateUser(id, { rol, username });

    // Enviamos una respuesta exitosa indicando que el usuario fue actualizado.
    return sendSuccess(res, updatedUser, "Usuario actualizado con éxito");
  } catch (error) {
    // En caso de error, enviamos una respuesta con el mensaje de error.
    return sendError(res, 500, error.message);
  }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    // Extraemos el ID del parámetro de la solicitud.
    const { id } = req.params;

    // Eliminamos al usuario utilizando el servicio.
    await userService.deleteUser(id);

    // Enviamos una respuesta exitosa indicando que el usuario fue eliminado.
    return sendSuccess(res, null, "Usuario eliminado con éxito");
  } catch (error) {
    // En caso de error, enviamos una respuesta con el mensaje de error.
    return sendError(res, 500, error.message);
  }
};
