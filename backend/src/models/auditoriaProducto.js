// Importamos los módulos necesarios de Sequelize y configuraciones.
const { DataTypes } = require('sequelize');  // DataTypes permite definir los tipos de columnas.
const sequelize = require('../config/database');  // Configuración de la conexión a la base de datos.
const Usuario = require('./Usuario');  // Modelo de Usuario para establecer relaciones.
const Producto = require('./Producto');  // Modelo de Producto para establecer relaciones.

// Definimos el modelo AuditoriaProducto que representa la tabla de auditoría de productos.
const AuditoriaProducto = sequelize.define('AuditoriaProducto', {
    // Definimos los campos de la tabla.
    id: {
        type: DataTypes.INTEGER,  // El tipo de datos para el ID es entero.
        primaryKey: true,  // Este campo es la clave primaria.
        autoIncrement: true  // Se auto incrementa en cada nuevo registro.
    },
    producto_id: {
        type: DataTypes.INTEGER,  // El tipo de datos para el ID del producto es entero.
        allowNull: false,  // Este campo no puede ser nulo.
        references: {
            model: 'producto',  // Hace referencia al modelo 'Producto'.
            key: 'id'  // Relacionado con el campo 'id' de la tabla Producto.
        }
    },
    usuario_id: {
        type: DataTypes.INTEGER,  // El tipo de datos para el ID del usuario es entero.
        allowNull: false,  // Este campo no puede ser nulo.
        references: {
            model: 'usuario',  // Hace referencia al modelo 'Usuario'.
            key: 'id'  // Relacionado con el campo 'id' de la tabla Usuario.
        }
    },
    accion: {
        type: DataTypes.ENUM('Actualizar', 'Registrar', 'Eliminado', 'Activado', 'Desactivado'),  // Tipo ENUM para las acciones realizadas.
        allowNull: true  // Este campo es opcional.
    },
    fecha: {
        type: DataTypes.DATE,  // El tipo de datos para la fecha es fecha y hora.
        allowNull: false  // Este campo no puede ser nulo.
    },
    detalles: {
        type: DataTypes.TEXT,  // El tipo de datos para los detalles es texto.
        allowNull: false  // Este campo no puede ser nulo.
    }
}, {
    tableName: 'auditoria_producto',  // Nombre de la tabla en la base de datos.
    timestamps: false  // No se gestionan automáticamente los campos 'createdAt' y 'updatedAt'.
});

// Establecemos la relación entre 'AuditoriaProducto' y 'Producto'.
// Esto indica que cada registro de auditoría de producto está relacionado con un producto específico.
AuditoriaProducto.belongsTo(Producto, {
    foreignKey: 'producto_id',  // El campo en 'AuditoriaProducto' que hace referencia a 'Producto' es 'producto_id'.
    onDelete: 'CASCADE'  // Si un producto es eliminado, los registros de auditoría correspondientes también se eliminarán.
});

// Establecemos la relación entre 'AuditoriaProducto' y 'Usuario'.
// Esto indica que cada registro de auditoría está relacionado con un usuario que realizó la acción.
AuditoriaProducto.belongsTo(Usuario, { foreignKey: 'usuario_id' });  // El campo en 'AuditoriaProducto' que hace referencia a 'Usuario' es 'usuario_id'.

// Exportamos el modelo para que pueda ser utilizado en otras partes de la aplicación.
module.exports = AuditoriaProducto;
