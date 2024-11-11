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

const updateMovimiento = async (id, movimientoData) => {
  return await movimientosInventarioRepository.update(id, movimientoData);
};

const deleteMovimiento = async (id) => {
  return await movimientosInventarioRepository.delete(id);
}


module.exports = {
  getAllMovimientos,
  getMovimientoById,
  createMovimiento,
  updateMovimiento,
  deleteMovimiento
};
