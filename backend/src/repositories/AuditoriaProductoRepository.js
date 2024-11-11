const AuditoriaProducto = require('../models/auditoriaProducto');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');
const Categoria = require('../models/Categoria');

class AuditoriaProductoRepository {
    // Método para obtener todos los registros de AuditoriaProducto
    async findAll() {
        return await AuditoriaProducto.findAll({
            include: [
                { 
                    model: Producto, // Incluir el modelo Producto
                    include: [
                        { 
                            model: Categoria, // Incluir el modelo Categoria
                            as: 'Categoria' // Usar el alias 'Categoria' para que se muestre correctamente en la respuesta
                        }
                    ]
                },
                { 
                    model: Usuario, // Incluir el modelo Usuario
                    attributes: { exclude: ['password'] } // Excluir el campo 'password' de la respuesta
                }
            ]
        });
    }

    // Método para obtener un registro de AuditoriaProducto por su ID
    async findById(id) {
        return await AuditoriaProducto.findByPk(id, {
            include: [
                { 
                    model: Producto, // Incluir el modelo Producto
                    include: [
                        { 
                            model: Categoria, // Incluir el modelo Categoria
                            as: 'Categoria' // Usar el alias 'Categoria' para que se muestre correctamente en la respuesta
                        }
                    ]
                },
                { 
                    model: Usuario, // Incluir el modelo Usuario
                    attributes: { exclude: ['password'] } // Excluir el campo 'password' de la respuesta
                }
            ]
        });
    }

    // Método para crear un nuevo registro de AuditoriaProducto
    async create(auditoriaProductoData) {
        return await AuditoriaProducto.create(auditoriaProductoData);
    }

    // Método para actualizar un registro de AuditoriaProducto por su ID
    async update(id, auditoriaProductoData) {
        return await AuditoriaProducto.update(auditoriaProductoData, { where: { id } });
    }

    // Método para eliminar un registro de AuditoriaProducto por su ID
    async delete(id) {
        return await AuditoriaProducto.destroy({ where: { id } });
    }
}

module.exports = new AuditoriaProductoRepository();