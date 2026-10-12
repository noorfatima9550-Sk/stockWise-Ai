const Customer = require("../models/Customer");
const SalesOrder = require("../models/SalesOrder");

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer by ID
// @route   GET /api/customers/:id
// @access  Public
const getCustomerById = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

// @desc    Create customer
// @route   POST /api/customers
// @access  Private (Admin / Manager)
const createCustomer = async (req, res, next) => {
  try {
    const { name, company, email, phone, address, taxId, customerType, creditLimit } = req.body;

    const customer = await Customer.create({
      name,
      company,
      email,
      phone,
      address,
      taxId,
      customerType: customerType || "Wholesale",
      creditLimit: creditLimit || 50000
    });

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private (Admin / Manager)
const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    Object.assign(customer, req.body);
    const updated = await customer.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private (Admin)
const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await Customer.deleteOne({ _id: customer._id });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get sales orders for customer
// @route   GET /api/customers/:id/orders
// @access  Public
const getCustomerOrders = async (req, res, next) => {
  try {
    const orders = await SalesOrder.find({ customer: req.params.id })
      .populate("items.product", "name sku")
      .populate("warehouse", "name code")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerOrders
};
