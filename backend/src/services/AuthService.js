const UsuarioRepository = require("../repositories/UsuarioRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
class AuthService {
  async register(username, password, rol) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await UsuarioRepository.create({ username, password: hashedPassword, rol });
  }

  async login(username, password) {
    const user = await UsuarioRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales incorrectas");
    }
    const token = jwt.sign({ userId: user.id, rol: user.rol }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    return { user: username, token };
  }
}

module.exports = new AuthService();
