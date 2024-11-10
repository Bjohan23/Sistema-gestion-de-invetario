const Categoria = require('../models/Categoria');

class CategoriaRepository {
    async findAll() {
        return await Categoria.findAll();
    }

    async findById(id) {
        return await Categoria.findByPk(id);
    }

    async create(categoria) {
        return await Categoria.create(categoria);
    }
}

module.exports = new CategoriaRepository();
