// Importamos la aplicación configurada y la conexión a la base de datos.
const app = require("./app"); // Configuración de la aplicación Express.
const sequelize = require("./src/config/database.js"); // Configuración de Sequelize para la base de datos.

// Autenticación con la base de datos.
sequelize
  .authenticate() // Método para probar la conexión con la base de datos.
  .then(() => {// Promesa que se ejecuta si la conexión es exitosa.
    console.log("Conexión a la base de datos exitosa"); // Mensaje en caso de éxito.

    // Sincronizar los modelos de Sequelize con la base de datos.
    // Esto crea las tablas en la base de datos si no existen.
    return sequelize.sync();
  })
  .then(() => {
    // Una vez que la conexión y sincronización son exitosas, se inicia el servidor.
    app.listen(3000, () => {
      console.log("Servidor corriendo en el puerto 3000"); // Mensaje de éxito.
    });
  })
  .catch((err) => {
    // Captura y muestra cualquier error ocurrido durante la conexión o sincronización.
    console.error("Error al conectar la base de datos:", err);
  });
