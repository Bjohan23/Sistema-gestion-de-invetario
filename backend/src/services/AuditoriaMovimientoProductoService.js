// src/services/AuditoriaMovimientoProductoService.js
const auditoriaMovimientoProductoRepository = require('../repositories/AuditoriaMovimientoProductoRepository');

const getAllAuditorias = async () => {
    return await auditoriaMovimientoProductoRepository.findAll();
};

const getAuditoriaById = async (id) => {
    return await auditoriaMovimientoProductoRepository.findById(id);
};

const createAuditoria = async (auditoriaData) => {
    return await auditoriaMovimientoProductoRepository.create(auditoriaData);
};

const updateAuditoria = async (id, auditoriaData) => {
    return await auditoriaMovimientoProductoRepository.update(id, auditoriaData);
};

const deleteAuditoria = async (id) => {
    return await auditoriaMovimientoProductoRepository.delete(id);
};

module.exports = {
    getAllAuditorias,
    getAuditoriaById,
    createAuditoria,
    updateAuditoria,
    deleteAuditoria
};
