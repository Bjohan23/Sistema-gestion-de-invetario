const MovimientosInventario = require('../models/MovimientosInventario');

class MovimientosInventarioRepository {
    async findAll() {
        return await MovimientosInventario.findAll();
    }

    async findById(id) {
        return await MovimientosInventario.findByPk(id);
    }

    async create(movimiento) {
        return await MovimientosInventario.create(movimiento);
    }
}

module.exports = new MovimientosInventarioRepository();
