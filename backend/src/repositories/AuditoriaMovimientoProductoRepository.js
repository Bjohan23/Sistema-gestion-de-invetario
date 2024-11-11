const AuditoriaMovimientoProducto = require('../models/AuditoriaMovimientoProducto');

class AuditoriaMovimientoProductoRepository {
    async findAll() {
        return await AuditoriaMovimientoProducto.findAll({ include: ['MovimientosInventario', 'Usuario'] });
    }

    async findById(id) {
        return await AuditoriaMovimientoProducto.findByPk(id, { include: ['MovimientosInventario', 'Usuario'] });
    }

    async create(auditoriaData) {
        return await AuditoriaMovimientoProducto.create(auditoriaData);
    }

    async update(id, auditoriaData) {
        return await AuditoriaMovimientoProducto.update(auditoriaData, { where: { id } });
    }

    async delete(id) {
        return await AuditoriaMovimientoProducto.destroy({ where: { id } });
    }
}

module.exports = new AuditoriaMovimientoProductoRepository();
