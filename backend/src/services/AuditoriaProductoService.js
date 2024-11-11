const auditoriaProductoRepository = require('../repositories/AuditoriaProductoRepository');

const getAllAuditoriaProductos = async () => {
    return await auditoriaProductoRepository.findAll();
};

const getAuditoriaProductoById = async (id) => {
    return await auditoriaProductoRepository.findById(id);
};

const createAuditoriaProducto = async (auditoriaProductoData) => {
    return await auditoriaProductoRepository.create(auditoriaProductoData);
};

const updateAuditoriaProducto = async (id, auditoriaProductoData) => {
    return await auditoriaProductoRepository.update(id, auditoriaProductoData);
};

const deleteAuditoriaProducto = async (id) => {
    return await auditoriaProductoRepository.delete(id);
};

module.exports = {
    getAllAuditoriaProductos,
    getAuditoriaProductoById,
    createAuditoriaProducto,
    updateAuditoriaProducto,
    deleteAuditoriaProducto
};
