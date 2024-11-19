// Importamos los módulos necesarios.
const express = require("express");
const cors = require("cors"); // Permite configurar políticas de CORS.
const authRoutes = require("./src/routes"); // Importamos las rutas de la aplicación.

const app = express(); // Creamos una instancia de Express.

// Middleware para parsear JSON.
// Esto permite que el servidor entienda cuerpos de solicitudes en formato JSON.
app.use(express.json());

// Middleware para parsear datos codificados en la URL (como formularios).
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS (Cross-Origin Resource Sharing).
// Permite que clientes de otros dominios interactúen con esta API.
app.use(cors({
    origin: '*', // Permite solicitudes desde cualquier origen.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos HTTP permitidos.
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas en las solicitudes.
    optionsSuccessStatus: 200 // Código de estado para las respuestas de las solicitudes preflight.
}));

// Rutas de la API.
// Todas las rutas del archivo importado estarán disponibles bajo el prefijo `/v1/api`.
app.use("/v1/api", authRoutes);

// Middleware para manejo de errores genéricos.
// Captura cualquier error no manejado que ocurra en la aplicación.
app.use((err, req, res, next) => {
    console.error(err.stack); // Muestra el error en la consola para depuración.
    res.status(500).send('Algo salió mal!'); // Responde con un mensaje genérico de error.
});

// Exportamos la instancia de la aplicación para usarla en otros archivos (por ejemplo, para iniciar el servidor).
module.exports = app;
