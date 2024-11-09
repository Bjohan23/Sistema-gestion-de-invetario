const userRepository = require("../repositories/UsuarioRepository");
// const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  return await userRepository.findAll();
};

const getUserById = async (id) => {
  return await userRepository.findById(id);
};

module.exports = {
  getAllUsers,
  getUserById,
};
