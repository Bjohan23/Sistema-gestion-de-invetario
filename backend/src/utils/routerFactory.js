// Importamos Express, que se utiliza para manejar rutas y solicitudes HTTP.
const express = require("express");

// Función que crea un router dinámico basado en una lista de rutas proporcionada.
function createRouter(routes) {
    // Creamos una instancia de un Router de Express.
    const router = express.Router();

    // Iteramos sobre cada ruta en la lista de rutas proporcionada.
    routes.forEach((route) => {
        const { method, path, handler } = route; // Desestructuramos el método, la ruta y el manejador de la ruta.
        
        // Usamos el método HTTP (get, post, put, delete, etc.) para definir la ruta en el router.
        // Se asocia la ruta (`path`) con el manejador (`handler`).
        router[method](path, handler);
    });

    // Retornamos el router configurado con todas las rutas.
    return router;
}

// Exportamos la función para que pueda ser usada en otras partes de la aplicación.
module.exports = createRouter;
