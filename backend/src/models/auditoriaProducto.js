const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Producto = require('./producto');

const AuditoriaProducto = sequelize.define('AuditoriaProducto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'producto',
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
        type: DataTypes.ENUM('Actualizar', 'Registrar', 'Eliminado', 'Activado', 'Desactivado'),
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
    tableName: 'auditoria_producto',
    timestamps: false
});

AuditoriaProducto.belongsTo(Producto, { foreignKey: 'producto_id' });
AuditoriaProducto.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = AuditoriaProducto;