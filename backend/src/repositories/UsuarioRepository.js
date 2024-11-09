const Usuario = require('../models/Usuario');

class UsuarioRepository {
    async findAll() {
        return await Usuario.findAll();
    }

    async findById(id) {
        return await Usuario.findByPk(id);
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
