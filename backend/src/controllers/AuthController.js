const AuthService = require("../services/AuthService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

exports.register = async (req, res) => {
  try {
    const { username, password, rol } = req.body;
    const newUser = await AuthService.register(username, password, rol);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await AuthService.login(username, password);
    sendSuccess(res, { user, token }, "Inicio de sesión exitoso");
  } catch (error) {
    sendError(res, 400, error.message);
  }
};
