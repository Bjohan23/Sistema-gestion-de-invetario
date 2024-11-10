const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const MovimientosInventario = require('./movimientos_inventario');

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
            model: 'movimientos_inventario',
            key: 'id'
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
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

AuditoriaMovimientoProducto.belongsTo(MovimientosInventario, { foreignKey: 'movimiento_inventario' });
AuditoriaMovimientoProducto.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = AuditoriaMovimientoProducto;