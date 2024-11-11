const AuthService = require("../services/AuthService");
const { sendSuccess, sendError } = require("../utils/responseHelper");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, rol, token } = await AuthService.login(username, password);
    sendSuccess(res, { user, rol, token }, "Inicio de sesión exitoso");
  } catch (error) {
    sendError(res, 400, error.message);
  }
};
