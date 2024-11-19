// Importamos el repositorio de usuarios, que contiene las operaciones directas con la base de datos.
const userRepository = require("../repositories/UsuarioRepository");

// Importamos bcryptjs para manejar el hash de contraseñas (encriptación).
const bcrypt = require("bcryptjs");

// Servicio para obtener todos los usuarios
const getAllUsers = async () => {
  // Llama al repositorio para obtener todos los registros de usuarios de la base de datos.
  return await userRepository.findAll();
};

// Servicio para obtener un usuario por su ID
const getUserById = async (id) => {
  // Llama al repositorio para buscar un usuario específico por su ID.
  return await userRepository.findById(id);
};

// Servicio para actualizar un usuario
const updateUser = async (id, userData) => {
  // Llama al repositorio para actualizar los datos de un usuario con un ID específico.
  return await userRepository.update(id, userData);
};

// Servicio para crear un nuevo usuario
const createUser = async (userData) => {
  // Encripta la contraseña antes de guardarla en la base de datos.
  const password = await bcrypt.hash(userData.password, 10);

  // Sustituye la contraseña en el objeto `userData` por la versión encriptada.
  userData.password = password;

  // Llama al repositorio para crear un nuevo registro en la base de datos con los datos proporcionados.
  return await userRepository.create(userData);
};

// Servicio para eliminar un usuario por su ID
const deleteUser = async (id) => {
  // Llama al repositorio para eliminar un registro específico de la base de datos.
  return await userRepository.delete(id);
};

// Exportamos los servicios para que puedan ser usados en los controladores.
module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};
