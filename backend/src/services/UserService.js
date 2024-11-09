const userRepository = require("../repositories/UsuarioRepository");
// const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  return await userRepository.findAll();
};

const getUserById = async (id) => {
  return await userRepository.findById(id);
};

const updateUser = async (id , user )=>{
  return await userRepository.update(id,user);
}

const deleteUser = async (id)=>{
  return await userRepository.delete(id);
}


module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
