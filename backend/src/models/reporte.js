const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reporte = sequelize.define('Reporte', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_productos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor_total: {
        type: DataTypes.DOUBLE(5, 2),
        allowNull: false
    }
}, {
    tableName: 'reporte',
    timestamps: false
});

module.exports = Reporte;