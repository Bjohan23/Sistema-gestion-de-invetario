const AuditoriaMovimientoProducto = require('../models/auditoriaMovimientoProducto');
const MovimientosInventario = require('../models/MovimientosInventario');
const Usuario = require('../models/Usuario');

class AuditoriaMovimientoProductoRepository {
    // Método para obtener todos los registros de AuditoriaMovimientoProducto
    async findAll() {
        return await AuditoriaMovimientoProducto.findAll({ 
            include: [
                { 
                    model: MovimientosInventario, // Incluir el modelo MovimientosInventario
                    as: 'MovimientosInventario' // Usar el alias 'MovimientosInventario' para que se muestre correctamente en la respuesta
                },
                { 
                    model: Usuario, // Incluir el modelo Usuario
                    as: 'Usuario', // Usar el alias 'Usuario' para que se muestre correctamente en la respuesta
                    attributes: { exclude: ['password'] }, // Excluir el campo 'password' de la respuesta
                }
            ]
        });
    }

    // Método para obtener un registro de AuditoriaMovimientoProducto por su ID
    async findById(id) {
        return await AuditoriaMovimientoProducto.findByPk(id, { 
            include: [
                { 
                    model: MovimientosInventario, // Incluir el modelo MovimientosInventario
                    as: 'MovimientosInventario' // Usar el alias 'MovimientosInventario' para que se muestre correctamente en la respuesta
                },
                { 
                    model: Usuario, // Incluir el modelo Usuario
                    as: 'Usuario', // Usar el alias 'Usuario' para que se muestre correctamente en la respuesta
                    attributes: { exclude: ['password'] }, // Excluir el campo 'password' de la respuesta
                }
            ]
        });
    }

    // Método para crear un nuevo registro de AuditoriaMovimientoProducto
    async create(auditoriaData) {
        return await AuditoriaMovimientoProducto.create(auditoriaData);
    }

    // Método para actualizar un registro de AuditoriaMovimientoProducto por su ID
    async update(id, auditoriaData) {
        return await AuditoriaMovimientoProducto.update(auditoriaData, { where: { id } });
    }

    // Método para eliminar un registro de AuditoriaMovimientoProducto por su ID
    async delete(id) {
        return await AuditoriaMovimientoProducto.destroy({ where: { id } });
    }
}

module.exports = new AuditoriaMovimientoProductoRepository();