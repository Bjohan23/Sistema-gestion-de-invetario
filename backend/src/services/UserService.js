const userRepository = require("../repositories/UsuarioRepository");
// const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  return await userRepository.findAll();
};

const getUserById = async (id) => {
  return await userRepository.findById(id);
};

const updateUser = async (id , userData )=>{
  return await userRepository.update(id,userData);
}

const createUser = async (userData) => {
  return await userRepository.create(userData);
};

const deleteUser = async (id)=>{
  return await userRepository.delete(id);
}


module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser
};
