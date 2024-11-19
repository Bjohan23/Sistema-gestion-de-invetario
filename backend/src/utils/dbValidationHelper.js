// Función para verificar si un registro con un valor específico ya existe en un modelo de la base de datos.
// `model`  -> El modelo Sequelize en el que se buscará.
// `column` -> La columna o atributo del modelo donde se buscará el valor.
// `value`  -> El valor que se buscará en la columna especificada.
const validExists = async (model, column, value) => {
    // Usamos el método `findOne` de Sequelize para buscar el primer registro que coincida.
    return await model.findOne({
        where: { [column]: value }, // `[column]` usa una clave dinámica para buscar en la columna especificada.
    });
};
/* 
ejemplo de uso 
await validExists(Usuario, "username", username);
*/
// Exportamos la función para que pueda ser utilizada en otras partes de la aplicación.
module.exports = validExists;
