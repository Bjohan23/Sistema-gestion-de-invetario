const movimientosInventarioRepository = require('../repositories/MovimientosInventarioRepository');

const getAllMovimientos = async () => {
  return await movimientosInventarioRepository.findAll();
};

const getMovimientoById = async (id) => {
  return await movimientosInventarioRepository.findById(id);
};

const createMovimiento = async (movimientoData) => {
  return await movimientosInventarioRepository.create(movimientoData);
};

module.exports = {
  getAllMovimientos,
  getMovimientoById,
  createMovimiento,
};
