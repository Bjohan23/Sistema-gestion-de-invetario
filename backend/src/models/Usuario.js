const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
id: { 
    type: DataTypes.INTEGER,
    primaryKey: true, autoIncrement: true 
},
username: {
    type: DataTypes.STRING, 
    unique: true, allowNull: false
 },
password: {
    type: DataTypes.STRING, 
    allowNull: false 
},
activo: { 
    type: DataTypes.BOOLEAN,
    defaultValue: true
},
rol: { 
    type: DataTypes.ENUM('Administrador', 'Encargado Almacen'),
    allowNull: false 
}
}, {
    tableName: 'usuario',
    timestamps: false
});

module.exports = Usuario;
