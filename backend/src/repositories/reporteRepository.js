const Reporte = require('../models/reporte');

class reporteRepository {
    async findAll() {
        return await Reporte.findAll();
    }

    async findById(id) {
        return await Reporte.findByPk(id);
    }

    async update(id, data) {
        return await Reporte.update(data, { where: { id } });
    }

    async create(data) {
        return await Reporte.create(data);
    }

    async delete(id) {
        return await Reporte.destroy({ where: { id } });
    }
}

module.exports = new reporteRepository();
