// Función genérica para enviar respuestas HTTP.
// `res`     -> El objeto de respuesta proporcionado por Express.
// `status`  -> Código de estado HTTP (ej. 200, 400, 500).
// `success` -> Indica si la operación fue exitosa (true/false).
// `data`    -> Datos que se devolverán en la respuesta (pueden ser un objeto, array, etc.).
// `message` -> Mensaje adicional para brindar contexto a la respuesta.
const sendResponse = (res, status, success, data, message) => {
    res.status(status).json({ success, data, message }); // Envía la respuesta en formato JSON.
};

// Función específica para enviar respuestas exitosas.
// `res`     -> Objeto de respuesta de Express.
// `data`    -> Los datos que se devolverán en la respuesta.
// `message` -> Mensaje opcional que describe el éxito.
const sendSuccess = (res, data, message) => {
    sendResponse(res, 200, true, data, message); // Respuesta con código 200 y éxito = true.
};

// Función específica para enviar respuestas de error.
// `res`     -> Objeto de respuesta de Express.
// `status`  -> Código de estado HTTP (ej. 400, 404, 500).
// `message` -> Mensaje que describe el error.
const sendError = (res, status, message) => {
    sendResponse(res, status, false, null, message); // Respuesta con éxito = false y sin datos.
};

/*
{
  "success": true,
  "data": { Datos retornados  },
  "message": "Operación exitosa"
}

*/

// Exportamos las funciones para que puedan ser usadas en otras partes de la aplicación.
module.exports = {
    sendSuccess,
    sendError,
};
