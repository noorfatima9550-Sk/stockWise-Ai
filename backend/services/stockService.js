const Inventory = require("../models/Inventory");
const StockMovement = require("../models/StockMovement");

/**
 * Adjust stock in a warehouse and log stock movement
 */
const adjustStock = async ({
  productId,
  warehouseId,
  quantityChange,
  movementType, // IN, OUT, TRANSFER, ADJUSTMENT
  reason = "",
  reference = "",
  sourceWarehouseId = null,
  targetWarehouseId = null,
  performedBy = null
}) => {
  let inventory = await Inventory.findOne({
    product: productId,
    warehouse: warehouseId
  });

  if (!inventory) {
    inventory = new Inventory({
      product: productId,
      warehouse: warehouseId,
      quantity: 0
    });
  }

  const oldQuantity = inventory.quantity;
  const newQuantity = oldQuantity + quantityChange;

  if (newQuantity < 0) {
    throw new Error(`Insufficient stock for product in warehouse. Current: ${oldQuantity}, requested change: ${quantityChange}`);
  }

  inventory.quantity = newQuantity;
  await inventory.save();

  // Record StockMovement
  const movement = await StockMovement.create({
    product: productId,
    sourceWarehouse: sourceWarehouseId || (quantityChange < 0 ? warehouseId : null),
    targetWarehouse: targetWarehouseId || (quantityChange > 0 ? warehouseId : null),
    movementType,
    quantity: Math.abs(quantityChange),
    reference,
    reason,
    performedBy
  });

  return { inventory, movement };
};

/**
 * Perform inter-warehouse stock transfer
 */
const transferStock = async ({
  productId,
  sourceWarehouseId,
  targetWarehouseId,
  quantity,
  reason = "Inter-warehouse transfer",
  performedBy = null
}) => {
  if (sourceWarehouseId === targetWarehouseId) {
    throw new Error("Source and target warehouse cannot be the same");
  }

  // Deduct from source warehouse
  await adjustStock({
    productId,
    warehouseId: sourceWarehouseId,
    quantityChange: -quantity,
    movementType: "TRANSFER",
    reason: `Transfer to warehouse ${targetWarehouseId}`,
    sourceWarehouseId,
    targetWarehouseId,
    performedBy
  });

  // Add to target warehouse
  await adjustStock({
    productId,
    warehouseId: targetWarehouseId,
    quantityChange: quantity,
    movementType: "TRANSFER",
    reason: `Transfer from warehouse ${sourceWarehouseId}`,
    sourceWarehouseId,
    targetWarehouseId,
    performedBy
  });

  return { success: true, message: `Successfully transferred ${quantity} units` };
};

module.exports = {
  adjustStock,
  transferStock
};
