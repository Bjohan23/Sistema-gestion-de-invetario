// Importamos la función `createRouter` que genera un router dinámico basado en una lista de rutas.
const createRouter = require("../utils/routerFactory");
// Importamos el controlador de usuarios, que contiene los manejadores para las rutas.
const usersController = require("../controllers/userController");
// Definimos un array de rutas que describe los endpoints y sus respectivos manejadores.
const routes = [
  {
    method: "get",        // Método HTTP GET para obtener todos los usuarios.
    path: "/",            // Ruta raíz del recurso.
    handler: usersController.getAllUsers, // Función que maneja la solicitud.
  },
  {
    method: "get",        // Método HTTP GET para obtener un usuario por ID.
    path: "/:id",         // Ruta con un parámetro dinámico `id`.
    handler: usersController.getUserById, // Función que maneja la solicitud.
  },
  {
    method: "post",       // Método HTTP POST para registrar un nuevo usuario.
    path: "/",            // Ruta raíz del recurso.
    handler: usersController.registerUser, // Función que maneja la solicitud.
  },
  {
    method: "put",        // Método HTTP PUT para actualizar un usuario por ID.
    path: "/:id",         // Ruta con un parámetro dinámico `id`.
    handler: usersController.updateUser, // Función que maneja la solicitud.
  },
  {
    method: "delete",     // Método HTTP DELETE para eliminar un usuario por ID.
    path: "/:id",         // Ruta con un parámetro dinámico `id`.
    handler: usersController.deleteUser, // Función que maneja la solicitud.
  },
];
// Exportamos el router dinámico generado por `createRouter` para ser usado en la aplicación principal.
module.exports = createRouter(routes);
