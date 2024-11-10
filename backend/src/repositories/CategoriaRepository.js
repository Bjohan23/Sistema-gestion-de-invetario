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

    async update(id, categoria) {
        return await Categoria.update(categoria, { where: { id } });
    }

    async delete(id) {
        return await Categoria.destroy({ where: { id } });
    }
}

module.exports = new CategoriaRepository();
