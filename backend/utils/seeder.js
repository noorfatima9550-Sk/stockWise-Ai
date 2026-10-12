const mongoose = require("mongoose");
const dns = require("dns");
try { dns.setServers(["8.8.8.8", "1.1.1.1"]); } catch (e) {}
require("dotenv").config({ path: __dirname + "/../.env" });

const User = require("../models/User");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");
const Warehouse = require("../models/Warehouse");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Customer = require("../models/Customer");
const SalesOrder = require("../models/SalesOrder");
const PurchaseOrder = require("../models/PurchaseOrder");
const Notification = require("../models/Notification");
const Forecast = require("../models/Forecast");
const StockMovement = require("../models/StockMovement");

const seedData = require("./seedData");

const importData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/stationery_db";
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB for seeding: ${mongoUri}`);

    // Clear existing collections
    await User.deleteMany();
    await Category.deleteMany();
    await Supplier.deleteMany();
    await Warehouse.deleteMany();
    await Product.deleteMany();
    await Inventory.deleteMany();
    await Customer.deleteMany();
    await SalesOrder.deleteMany();
    await PurchaseOrder.deleteMany();
    await Notification.deleteMany();
    await Forecast.deleteMany();
    await StockMovement.deleteMany();

    console.log("Existing database records cleared.");

    // 1. Insert Users
    const createdUsers = await User.create(seedData.users);
    console.log(`Created ${createdUsers.length} Users.`);
    const adminUser = createdUsers.find((u) => u.role === "admin");

    // 2. Insert Categories
    const createdCategories = await Category.create(seedData.categories);
    console.log(`Created ${createdCategories.length} Categories.`);

    // 3. Insert Suppliers
    const createdSuppliers = await Supplier.create(seedData.suppliers);
    console.log(`Created ${createdSuppliers.length} Suppliers.`);

    // 4. Insert Warehouses
    const createdWarehouses = await Warehouse.create(seedData.warehouses);
    console.log(`Created ${createdWarehouses.length} Warehouses.`);

    // 5. Insert Customers
    const createdCustomers = await Customer.create(seedData.customers);
    console.log(`Created ${createdCustomers.length} Customers.`);

    // 6. Insert Products & Initial Inventory
    for (const prodData of seedData.products) {
      const category = createdCategories.find((c) => c.code === prodData.categoryCode);
      const supplier = createdSuppliers.find((s) => s.name === prodData.supplierName);

      const product = await Product.create({
        name: prodData.name,
        sku: prodData.sku,
        category: category ? category._id : createdCategories[0]._id,
        supplier: supplier ? supplier._id : createdSuppliers[0]._id,
        description: prodData.description,
        brand: prodData.brand,
        unit: prodData.unit,
        packSize: prodData.packSize,
        sellingPrice: prodData.sellingPrice,
        costPrice: prodData.costPrice,
        minimumStockLevel: prodData.minimumStockLevel,
        reorderQuantity: prodData.reorderQuantity,
        status: prodData.status
      });

      // Create Inventories across Warehouses
      for (const whCode of Object.keys(prodData.initialStock)) {
        const qty = prodData.initialStock[whCode];
        const warehouse = createdWarehouses.find((w) => w.code === whCode);
        if (warehouse) {
          await Inventory.create({
            product: product._id,
            warehouse: warehouse._id,
            quantity: qty,
            rackBinLocation: `Bin-${Math.floor(Math.random() * 20 + 1)}`
          });

          if (qty > 0) {
            await StockMovement.create({
              product: product._id,
              targetWarehouse: warehouse._id,
              movementType: "IN",
              quantity: qty,
              reference: "INITIAL_SEED",
              reason: "Opening Inventory Setup",
              performedBy: adminUser._id
            });
          }
        }
      }
    }
    console.log(`Created Products and Initial Inventories.`);

    // 7. Create Sample Sales Orders
    const allProducts = await Product.find();
    const mainWarehouse = createdWarehouses[0];

    const sampleOrdersData = [
      {
        orderNumber: "#SO-1024",
        customer: createdCustomers[0]._id,
        status: "Confirmed",
        paymentStatus: "Paid",
        items: [
          { product: allProducts[0]._id, quantity: 50, unitPrice: allProducts[0].sellingPrice, total: 50 * allProducts[0].sellingPrice },
          { product: allProducts[1]._id, quantity: 30, unitPrice: allProducts[1].sellingPrice, total: 30 * allProducts[1].sellingPrice }
        ]
      },
      {
        orderNumber: "#SO-1023",
        customer: createdCustomers[1]._id,
        status: "Pending",
        paymentStatus: "Pending",
        items: [
          { product: allProducts[2]._id, quantity: 20, unitPrice: allProducts[2].sellingPrice, total: 20 * allProducts[2].sellingPrice }
        ]
      },
      {
        orderNumber: "#SO-1022",
        customer: createdCustomers[2]._id,
        status: "Processing",
        paymentStatus: "Partial",
        items: [
          { product: allProducts[3]._id, quantity: 100, unitPrice: allProducts[3].sellingPrice, total: 100 * allProducts[3].sellingPrice }
        ]
      }
    ];

    for (const ord of sampleOrdersData) {
      const subtotal = ord.items.reduce((s, i) => s + i.total, 0);
      await SalesOrder.create({
        orderNumber: ord.orderNumber,
        customer: ord.customer,
        items: ord.items,
        subtotal,
        tax: Math.round(subtotal * 0.18),
        discount: 0,
        total: subtotal + Math.round(subtotal * 0.18),
        status: ord.status,
        paymentStatus: ord.paymentStatus,
        warehouse: mainWarehouse._id,
        createdBy: adminUser._id
      });
    }
    console.log("Created Sample Sales Orders.");

    // 8. Create Initial Notifications
    const outOfStockProd = allProducts.find((p) => p.sku === "ERA-STD-005");
    const lowStockProd = allProducts.find((p) => p.sku === "PAP-A4-003");

    if (outOfStockProd) {
      await Notification.create({
        title: `Out of Stock Alert: ${outOfStockProd.name}`,
        message: `Product ${outOfStockProd.name} (SKU: ${outOfStockProd.sku}) has reached 0 units. Urgent reorder required.`,
        type: "out_of_stock",
        severity: "critical",
        product: outOfStockProd._id
      });
    }

    if (lowStockProd) {
      await Notification.create({
        title: `Low Stock Warning: ${lowStockProd.name}`,
        message: `Product ${lowStockProd.name} is running low (Current: 90, Minimum: ${lowStockProd.minimumStockLevel}).`,
        type: "low_stock",
        severity: "warning",
        product: lowStockProd._id
      });
    }
    console.log("Created Initial Notifications.");

    console.log("=========================================");
    console.log("Database successfully seeded!");
    console.log("Admin login credentials: admin@stockwise.com / password123");
    console.log("=========================================");

    process.exit(0);
  } catch (error) {
    console.error(`Seeding Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
