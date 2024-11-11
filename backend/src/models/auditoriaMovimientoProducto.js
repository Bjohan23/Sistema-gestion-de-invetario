const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const MovimientosInventario = require('./MovimientosInventario');

const AuditoriaMovimientoProducto = sequelize.define('AuditoriaMovimientoProducto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movimiento_inventario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MovimientosInventario,
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    accion: {
        type: DataTypes.ENUM('Actualizar', 'Registrar', 'Borrar'),
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    detalles: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'auditoria_movimiento_producto',
    timestamps: false
});

AuditoriaMovimientoProducto.belongsTo(MovimientosInventario, { foreignKey: 'movimiento_inventario' , as: 'MovimientosInventario'});
AuditoriaMovimientoProducto.belongsTo(Usuario, { foreignKey: 'usuario_id' , as: 'Usuario'});

module.exports = AuditoriaMovimientoProducto;