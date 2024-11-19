// Importamos el modelo Usuario, que representa la tabla en la base de datos.
const Usuario = require("../models/Usuario");

class UsuarioRepository {
  // Obtiene todos los usuarios pero excluye el campo 'password' de los resultados.
  async findAll() {
    return await Usuario.findAll({
      attributes: { exclude: ["password"] }, // Excluimos la contraseña por seguridad.
    });
  }

  // Obtiene un usuario por su ID, excluyendo también el campo 'password'.
  async findById(id) {
    return await Usuario.findByPk(id, {
      attributes: { exclude: ["password"] }, // Excluimos la contraseña por seguridad.
    });
  }

  // Elimina un usuario de la base de datos basado en su ID.
  async delete(id) {
    return await Usuario.destroy({ where: { id } }); // Utilizamos 'destroy' con una cláusula WHERE.
  }

  // Actualiza los datos de un usuario identificado por su ID.
  async update(id, user) {
    return await Usuario.update(user, { where: { id } }); // Se actualizan los campos proporcionados.
  }

  // Actualiza únicamente la contraseña de un usuario, identificado por su ID.
  async updatePassword(id, password) {
    return await Usuario.update({ password }, { where: { id } }); // Solo se actualiza el campo 'password'.
  }

  // Busca un usuario en la base de datos por su nombre de usuario.
  async findByUsername(username) {
    return await Usuario.findOne({ where: { username } }); // Retorna el usuario si existe, o null si no.
  }

  // Crea un nuevo usuario en la base de datos.
  async create(user) {
    return await Usuario.create(user); // Inserta un nuevo registro en la tabla.
  }
}

// Exportamos una instancia de la clase para ser reutilizada en otros módulos.
module.exports = new UsuarioRepository();
