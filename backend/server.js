const app = require("./app");
const sequelize = require("./src/config/database.js");

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");

    
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor corriendo en el puerto 3000");
    });
  })
  .catch((err) => {
    console.error("Error al conectar la base de datos:", err);
  });