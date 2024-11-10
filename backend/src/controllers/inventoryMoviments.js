const { sendSuccess, sendError } = require("../utils/responseHelper");
const inventoryMovementService = require("../services/InventoryMovementServices");

// Controlador para obtener todos los movimientos de inventario
exports.getAllInventoryMovements = async (req, res) => {
  try {
    const movements = await inventoryMovementService.getAllInventoryMovements();
    return sendSuccess(res, movements);
  } catch (error) {
    return sendError(res, 500, "Error al obtener los movimientos de inventario: " + error.message);
  }
};

// Controlador para obtener un movimiento de inventario por ID
exports.getInventoryMovementById = async (req, res) => {
  try {
    const { id } = req.params;
    const movement = await inventoryMovementService.getInventoryMovementById(id);

    if (!movement) {
      return sendError(res, 404, "Movimiento de inventario no encontrado");
    }

    return sendSuccess(res, movement);
  } catch (error) {
    return sendError(res, 500, "Error al obtener el movimiento de inventario: " + error.message);
  }
};

// Controlador para registrar un movimiento de inventario
exports.registerInventoryMovement = async (req, res) => {
  try {
    const { productId, quantity, movementType, description } = req.body;

    const newMovement = await inventoryMovementService.createInventoryMovement({
      productId,
      quantity,
      movementType,
      description
    });
    return sendSuccess(res, newMovement, "Movimiento de inventario registrado con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al registrar el movimiento de inventario: " + error.message);
  }
};

// Controlador para actualizar un movimiento de inventario
exports.updateInventoryMovement = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity, movementType, description } = req.body;

    const updatedMovement = await inventoryMovementService.updateInventoryMovement(id, {
      productId,
      quantity,
      movementType,
      description
    });
    return sendSuccess(res, updatedMovement, "Movimiento de inventario actualizado con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al actualizar el movimiento de inventario: " + error.message);
  }
};

// Controlador para eliminar un movimiento de inventario
exports.deleteInventoryMovement = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovement = await inventoryMovementService.deleteInventoryMovement(id);
    if (!deletedMovement) {
      return sendError(res, 404, "Movimiento de inventario no encontrado");
    }

    return sendSuccess(res, null, "Movimiento de inventario eliminado con éxito");
  } catch (error) {
    return sendError(res, 500, "Error al eliminar el movimiento de inventario: " + error.message);
  }
};
