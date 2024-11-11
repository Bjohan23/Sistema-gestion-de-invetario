// models/producto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria'); // Importar el modelo Categoria

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    precio: {
        type: DataTypes.DOUBLE(5, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'producto',
    timestamps: false
});

// Definir la relación con un alias
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'Categoria' });

module.exports = Producto;