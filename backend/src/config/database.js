// Importamos Sequelize, un ORM para manejar bases de datos relacionales como MySQL.
const { Sequelize } = require('sequelize');

// Importamos dotenv para manejar las variables de entorno desde un archivo .env.
require('dotenv').config();

// Creamos una nueva instancia de Sequelize, configurando la conexión a la base de datos.
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos (se toma de las variables de entorno).
    process.env.DB_USER, // Usuario de la base de datos (se toma de las variables de entorno).
    process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos (se toma de las variables de entorno).
    {
        host: process.env.DB_HOST, // Host o dirección del servidor de la base de datos (se toma de las variables de entorno).
        dialect: 'mysql', // Especificamos el dialecto que estamos utilizando, en este caso MySQL.
        port: 3306 // Puerto en el que escucha MySQL (por defecto, es 3306).
    }
);

// Exportamos la instancia de Sequelize para que pueda ser utilizada en otros módulos de la aplicación.
module.exports = sequelize;
