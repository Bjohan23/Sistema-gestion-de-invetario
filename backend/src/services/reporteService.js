const reporteRepository = require("../repositories/reporteRepository");

const getAllReporte= async () => {
    return await reporteRepository.findAll();
}

const getUserById = async (id) => {
    return await reporteRepository.findById(id);
}

const updateReporte= async (id, user) => {
    return await reporteRepository.update(id, user);
}

const deleteReporte = async (id) => {
    return await reporteRepository.delete(id);
}

const createReporte = async (user) => {
    return await reporteRepository.create(user);
}

module.exports = {
    getAllReporte,
    getUserById,
    updateReporte,
    deleteReporte,
    createReporte
};