const Producto = require('../models/Producto');

class ProductoRepository {
    async findAll() {
        return await Producto.findAll();
    }

    async findById(id) {
        return await Producto.findByPk(id);
    }

    async create(producto) {
        return await Producto.create(producto);
    }
}

module.exports = new ProductoRepository();
