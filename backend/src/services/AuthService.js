// Importamos las dependencias necesarias
const UsuarioRepository = require("../repositories/UsuarioRepository"); // Para consultar usuarios en la base de datos
const bcrypt = require("bcryptjs"); // Para comparar la contraseña encriptada con la ingresada
const jwt = require("jsonwebtoken"); // Para crear el token de autenticación
require("dotenv").config(); // Para cargar variables de entorno, como la clave secreta para JWT

// Creamos la clase AuthService para manejar la autenticación
class AuthService {
  // Método para manejar el inicio de sesión
  async login(username, password) {
    // Buscamos al usuario en la base de datos utilizando el repositorio.
    const user = await UsuarioRepository.findByUsername(username);
    // Si el usuario no existe o las contraseñas no coinciden, lanzamos un error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales incorrectas"); // Error si las credenciales son incorrectas
    }
    // Si las credenciales son correctas, generamos un token JWT
    const token = jwt.sign(
      { userId: user.id, rol: user.rol }, // Payload: ID de usuario y rol para autenticar en el sistema
      process.env.JWT_SECRET, // Usamos una clave secreta almacenada en las variables de entorno
      { expiresIn: "6h" } // El token tiene una validez de 6 horas
    );
    // Devolvemos un objeto con el nombre de usuario, rol y el token generado
    return { user: username, rol: user.rol, token };
  }
}

// Exportamos una instancia de AuthService para poder usarla en otros módulos
module.exports = new AuthService();
