const { sendSuccess, sendError } = require("../utils/responseHelper");
const auditoriaProductoService = require("../services/AuditoriaProductoService");

exports.getAllAuditoriaProductos = async (req, res) => {
    try {
        const auditoriaProductos = await auditoriaProductoService.getAllAuditoriaProductos();
        return sendSuccess(res, auditoriaProductos, "Lista de auditorías de productos obtenida con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al obtener la lista de auditorías: " + error.message);
    }
};

exports.getAuditoriaProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const auditoriaProducto = await auditoriaProductoService.getAuditoriaProductoById(id);

        if (!auditoriaProducto) {
            return sendError(res, 404, "Auditoría de producto no encontrada");
        }

        return sendSuccess(res, auditoriaProducto, "Auditoría de producto obtenida con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al obtener la auditoría de producto: " + error.message);
    }
};

exports.createAuditoriaProducto = async (req, res) => {
    try {
        const { producto_id, usuario_id, accion, fecha, detalles } = req.body;

        const newAuditoriaProducto = await auditoriaProductoService.createAuditoriaProducto({
            producto_id,
            usuario_id,
            accion,
            fecha,
            detalles
        });
        return sendSuccess(res, newAuditoriaProducto, "Auditoría de producto registrada con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al registrar la auditoría de producto: " + error.message);
    }
};

exports.updateAuditoriaProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { producto_id, usuario_id, accion, fecha, detalles } = req.body;

        const updatedAuditoriaProducto = await auditoriaProductoService.updateAuditoriaProducto(id, {
            producto_id,
            usuario_id,
            accion,
            fecha,
            detalles
        });
        return sendSuccess(res, updatedAuditoriaProducto, "Auditoría de producto actualizada con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al actualizar la auditoría de producto: " + error.message);
    }
};

exports.deleteAuditoriaProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAuditoriaProducto = await auditoriaProductoService.deleteAuditoriaProducto(id);
        if (!deletedAuditoriaProducto) {
            return sendError(res, 404, "Auditoría de producto no encontrada");
        }

        return sendSuccess(res, null, "Auditoría de producto eliminada con éxito");
    } catch (error) {
        return sendError(res, 500, "Error al eliminar la auditoría de producto: " + error.message);
    }
};
