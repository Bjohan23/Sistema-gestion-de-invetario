const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Producto = require('./Producto'); 
const MovimientosInventario = sequelize.define('MovimientosInventario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('Ingreso', 'Egreso'),
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('Realizado', 'No Compleado', 'Eliminado'),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'movimientos_inventario',
    timestamps: false
});
// definir la relacion con un alias 
MovimientosInventario.belongsTo(Producto, { foreignKey: 'producto_id', as: 'Producto' });
module.exports = MovimientosInventario;
