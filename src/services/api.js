const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("stockwise_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  register: async (name, email, password, role = "staff") => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products?${query}`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  createProduct: async (productData) => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(productData)
    });
    return handleResponse(res);
  },

  // Inventory
  getInventory: async () => {
    const res = await fetch(`${API_BASE_URL}/inventory`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  adjustInventory: async (adjustData) => {
    const res = await fetch(`${API_BASE_URL}/inventory/adjust`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(adjustData)
    });
    return handleResponse(res);
  },

  // Warehouses
  getWarehouses: async () => {
    const res = await fetch(`${API_BASE_URL}/warehouses`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  transferStock: async (transferData) => {
    const res = await fetch(`${API_BASE_URL}/warehouses/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(transferData)
    });
    return handleResponse(res);
  },

  // Customers
  getCustomers: async () => {
    const res = await fetch(`${API_BASE_URL}/customers`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  // Suppliers
  getSuppliers: async () => {
    const res = await fetch(`${API_BASE_URL}/suppliers`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  // Orders
  getOrders: async () => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(orderData)
    });
    return handleResponse(res);
  },

  updateOrderStatus: async (orderId, statusData) => {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(statusData)
    });
    return handleResponse(res);
  },

  // Purchase Orders
  getPurchaseOrders: async () => {
    const res = await fetch(`${API_BASE_URL}/purchase-orders`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  // Dashboard
  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  // Reports
  getSalesReport: async () => {
    const res = await fetch(`${API_BASE_URL}/reports/sales`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  getInventoryReport: async () => {
    const res = await fetch(`${API_BASE_URL}/reports/inventory`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  // AI
  getAIForecast: async () => {
    const res = await fetch(`${API_BASE_URL}/ai/forecast`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  // Notifications
  getNotifications: async () => {
    const res = await fetch(`${API_BASE_URL}/notifications`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  },

  markNotificationRead: async (id) => {
    const res = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: "PUT",
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(res);
  }
};
