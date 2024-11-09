const Usuario = require('../models/Usuario');

class UsuarioRepository {
    async findAll() {
        return await Usuario.findAll();
    }

    async findById(id) {
        return await Usuario.findByPk(id);
    }


    async findByUsername(username) {
        return await Usuario.findOne({ where: { username } });
    }

    async create(user) {
        return await Usuario.create(user);
    }

}

module.exports = new UsuarioRepository();
