const { sendSuccess, sendError } = require("../utils/responseHelper");
const movimientosService = require("../services/MovimientosInventarioService");

exports.getAllMovimientos = async (req, res) => {
    try {
        const movimientos = await movimientosService.getAllMovimientos();
        return sendSuccess(res, movimientos, "Lista de movimientos de inventario obtenida con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al obtener la lista de movimientos: " + error.message);
    }
};

exports.getMovimientoById = async (req, res) => {
    try {
        const { id } = req.params;
        const movimiento = await movimientosService.getMovimientoById(id);

        if (!movimiento) {
            return sendError(res, 404, "Movimiento de inventario no encontrado");
        }

        return sendSuccess(res, movimiento, "Movimiento de inventario obtenido con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al obtener el movimiento de inventario: " + error.message);
    }
};

exports.createMovimiento = async (req, res) => {
    try {
        const { producto_id, cantidad, tipo, estado, fecha, motivo } = req.body;

        const newMovimiento = await movimientosService.createMovimiento({
            producto_id,
            cantidad,
            tipo,
            estado,
            fecha,
            motivo
        });
        return sendSuccess(res, newMovimiento, "Movimiento de inventario registrado con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al registrar el movimiento de inventario: " + error.message);
    }
};

exports.updateMovimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto_id, cantidad, tipo, estado, fecha, motivo } = req.body;

        const updatedMovimiento = await movimientosService.updateMovimiento(id, {
            producto_id,
            cantidad,
            tipo,
            estado,
            fecha,
            motivo
        });
        return sendSuccess(res, updatedMovimiento, "Movimiento de inventario actualizado con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al actualizar el movimiento de inventario: " + error.message);
    }
};

exports.deleteMovimiento = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMovimiento = await movimientosService.deleteMovimiento(id);
        if (!deletedMovimiento) {
            return sendError(res, 404, "Movimiento de inventario no encontrado");
        }

        return sendSuccess(res, null, "Movimiento de inventario eliminado con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al eliminar el movimiento de inventario: " + error.message);
    }
};
