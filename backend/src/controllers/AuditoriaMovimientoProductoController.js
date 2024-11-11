// src/controllers/AuditoriaMovimientoProductoController.js
const { sendSuccess, sendError } = require("../utils/responseHelper");
const auditoriaService = require("../services/AuditoriaMovimientoProductoService");

exports.getAllAuditorias = async (req, res) => {
    try {
        const auditorias = await auditoriaService.getAllAuditorias();
        return sendSuccess(res, auditorias, "Lista de auditorías de movimientos obtenida con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al obtener la lista de auditorías: " + error.message);
    }
};

exports.getAuditoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const auditoria = await auditoriaService.getAuditoriaById(id);

        if (!auditoria) {
            return sendError(res, 404, "Auditoría de movimiento no encontrada");
        }

        return sendSuccess(res, auditoria, "Auditoría de movimiento obtenida con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al obtener la auditoría de movimiento: " + error.message);
    }
};

exports.createAuditoria = async (req, res) => {
    try {
        const { movimiento_inventario, usuario_id, accion, fecha, detalles } = req.body;

        const newAuditoria = await auditoriaService.createAuditoria({
            movimiento_inventario,
            usuario_id,
            accion,
            fecha,
            detalles
        });
        return sendSuccess(res, newAuditoria, "Auditoría de movimiento registrada con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al registrar la auditoría de movimiento: " + error.message);
    }
};

exports.updateAuditoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { movimiento_inventario, usuario_id, accion, fecha, detalles } = req.body;

        const updatedAuditoria = await auditoriaService.updateAuditoria(id, {
            movimiento_inventario,
            usuario_id,
            accion,
            fecha,
            detalles
        });
        return sendSuccess(res, updatedAuditoria, "Auditoría de movimiento actualizada con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al actualizar la auditoría de movimiento: " + error.message);
    }
};

exports.deleteAuditoria = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAuditoria = await auditoriaService.deleteAuditoria(id);
        if (!deletedAuditoria) {
            return sendError(res, 404, "Auditoría de movimiento no encontrada");
        }

        return sendSuccess(res, null, "Auditoría de movimiento eliminada con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al eliminar la auditoría de movimiento: " + error.message);
    }
};
