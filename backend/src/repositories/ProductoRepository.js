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

    async update(id, producto) {
        const product = await Producto.findByPk(id);

        if (!product) {
            return null;
        }

        return await product.update(producto);
    }

    async delete(id) {
        const product = await Producto.findByPk(id);

        if (!product) {
            return null;
        }

        return await product.destroy();
    }
}

module.exports = new ProductoRepository();
