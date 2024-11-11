const MovimientosInventario = require("../models/MovimientosInventario");
const Producto = require("../models/Producto");
const Categoria = require("../models/Categoria");
class MovimientosInventarioRepository {
  async findAll() {
    return await MovimientosInventario.findAll({
      include: [
        {
          model: Producto,
          as: "Producto",
          include: [
            {
              model: Categoria,
              as: "Categoria",
            },
          ],
        },
      ],
    });
  }

  async findById(id) {
    return await MovimientosInventario.findByPk(id, {
      include: [
        {
          model: Producto,
          as: "Producto",
          include: [
            {
              model: Categoria,
              as: "Categoria",
            },
          ],
        },
      ],
    });
  }

  async create(movimiento) {
    return await MovimientosInventario.create(movimiento);
  }

  async update(id, movimiento) {
    return await MovimientosInventario.update(movimiento, { where: { id } });
  }

  async delete(id) {
    return await MovimientosInventario.destroy({ where: { id } });
  }
}

module.exports = new MovimientosInventarioRepository();
