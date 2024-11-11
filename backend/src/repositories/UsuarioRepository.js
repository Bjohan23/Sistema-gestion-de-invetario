const Usuario = require("../models/Usuario");

class UsuarioRepository {
  // este metodo obtiene todos los usuarios pero excluye la contraseña
  async findAll() {
    return await Usuario.findAll({
      attributes: { exclude: ["password"] },
    });
  }
  // excluye la contraseña para que no se muestre en la respuesta
  async findById(id) {
    return await Usuario.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async delete(id) {
    return await Usuario.destroy({ where: { id } });
  }

  async update(id, user) {
    return await Usuario.update(user, { where: { id } });
  }

  // actualizar contraseña
  async updatePassword(id, password) {
    return await Usuario.update({ password }, { where: { id } });
  }

  async findByUsername(username) {
    return await Usuario.findOne({ where: { username } });
  }

  async create(user) {
    return await Usuario.create(user);
  }
}

module.exports = new UsuarioRepository();
