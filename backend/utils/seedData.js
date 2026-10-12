module.exports = {
  users: [
    {
      name: "Admin User",
      email: "admin@stockwise.com",
      password: "password123",
      role: "admin"
    },
    {
      name: "Manager User",
      email: "manager@stockwise.com",
      password: "password123",
      role: "manager"
    },
    {
      name: "Staff User",
      email: "staff@stockwise.com",
      password: "password123",
      role: "staff"
    }
  ],
  categories: [
    { name: "Notebooks", code: "NTB", description: "Spiral, hardbound & softcover notebooks" },
    { name: "Pens & Markers", code: "PNM", description: "Ball pens, gel pens, highlighters & permanent markers" },
    { name: "Paper Products", code: "PPR", description: "A4 paper, chart paper & sticky notes" },
    { name: "Art Supplies", code: "ART", description: "Colors, brushes, canvases & sketchbooks" },
    { name: "Desk Accessories", code: "DSK", description: "Staplers, tape dispensers, paper clips & organizers" }
  ],
  suppliers: [
    {
      name: "Camel Stationery Suppliers",
      contactPerson: "Rajesh Kumar",
      email: "rajesh@camelstationery.com",
      phone: "+91 98765 43210",
      address: "12 Industrial Area, Phase II, Mumbai",
      paymentTerms: "Net 30",
      leadTimeDays: 5,
      categoriesSupplied: ["Notebooks", "Art Supplies"]
    },
    {
      name: "Natraj Paper Mills",
      contactPerson: "Anil Sharma",
      email: "orders@natrajpaper.com",
      phone: "+91 98123 45678",
      address: "45 Paper Mill Road, Pune",
      paymentTerms: "Net 15",
      leadTimeDays: 3,
      categoriesSupplied: ["Paper Products"]
    },
    {
      name: "Classmate Distribution Ltd",
      contactPerson: "Suresh Gupta",
      email: "distribution@classmate.in",
      phone: "+91 99887 76655",
      address: "88 Trade Center, New Delhi",
      paymentTerms: "Net 30",
      leadTimeDays: 7,
      categoriesSupplied: ["Notebooks", "Pens & Markers"]
    }
  ],
  warehouses: [
    {
      name: "Main Distribution Center",
      code: "WH-MAIN",
      address: "Plot 101, Logistics Hub",
      city: "Mumbai",
      contactPerson: "Vikram Singh",
      phone: "+91 98220 11223",
      capacity: 15000
    },
    {
      name: "North Region Depot",
      code: "WH-NORTH",
      address: "Sector 18, Industrial Estate",
      city: "Delhi",
      contactPerson: "Amit Verma",
      phone: "+91 98110 33445",
      capacity: 10000
    },
    {
      name: "West Coast Facility",
      code: "WH-WEST",
      address: "GIDC Industrial Zone",
      city: "Ahmedabad",
      contactPerson: "Pankaj Patel",
      phone: "+91 98990 55667",
      capacity: 8000
    }
  ],
  customers: [
    {
      name: "Sharma Book Depot",
      company: "Sharma Traders Pvt Ltd",
      email: "info@sharmabooks.com",
      phone: "+91 98234 56789",
      address: "Station Road, Jaipur",
      taxId: "GSTIN29AAACS1234A1Z5",
      customerType: "Wholesale",
      creditLimit: 100000
    },
    {
      name: "Bright Student Store",
      company: "Bright Retailers",
      email: "orders@brightstore.in",
      phone: "+91 97654 32109",
      address: "College Road, Pune",
      taxId: "GSTIN27BBBCS5678B1Z2",
      customerType: "Retailer",
      creditLimit: 50000
    },
    {
      name: "Apex Office Supplies",
      company: "Apex Commercial Corp",
      email: "procurement@apexoffice.com",
      phone: "+91 99112 23344",
      address: "Connaught Place, New Delhi",
      taxId: "GSTIN07CCCCS9012C1Z8",
      customerType: "Distributor",
      creditLimit: 250000
    }
  ],
  products: [
    {
      name: "Notebook A4 200 Pages",
      sku: "NB-A4-001",
      categoryCode: "NTB",
      supplierName: "Classmate Distribution Ltd",
      description: "Premium single line A4 spiral notebook",
      brand: "Classmate",
      unit: "Pcs",
      packSize: 10,
      sellingPrice: 120,
      costPrice: 85,
      minimumStockLevel: 100,
      reorderQuantity: 300,
      status: "Active",
      initialStock: { "WH-MAIN": 450, "WH-NORTH": 200 }
    },
    {
      name: "Blue Gel Pen 0.7mm",
      sku: "PEN-BLU-002",
      categoryCode: "PNM",
      supplierName: "Classmate Distribution Ltd",
      description: "Smooth writing waterproof blue gel pen",
      brand: "Pentonic",
      unit: "Box",
      packSize: 20,
      sellingPrice: 160,
      costPrice: 110,
      minimumStockLevel: 200,
      reorderQuantity: 500,
      status: "Active",
      initialStock: { "WH-MAIN": 1200, "WH-NORTH": 600 }
    },
    {
      name: "A4 Copier Paper 75GSM (500 Sheets)",
      sku: "PAP-A4-003",
      categoryCode: "PPR",
      supplierName: "Natraj Paper Mills",
      description: "High brightness multi-purpose printing paper",
      brand: "JK Copier",
      unit: "Ream",
      packSize: 5,
      sellingPrice: 280,
      costPrice: 210,
      minimumStockLevel: 100,
      reorderQuantity: 250,
      status: "Active",
      initialStock: { "WH-MAIN": 90, "WH-NORTH": 40 }
    },
    {
      name: "Graphite Pencil HB (Pack of 10)",
      sku: "PEN-GRA-004",
      categoryCode: "PNM",
      supplierName: "Camel Stationery Suppliers",
      description: "Dark HB pencils for writing and drawing",
      brand: "Apsara",
      unit: "Pack",
      packSize: 10,
      sellingPrice: 75,
      costPrice: 50,
      minimumStockLevel: 150,
      reorderQuantity: 400,
      status: "Active",
      initialStock: { "WH-MAIN": 780, "WH-WEST": 300 }
    },
    {
      name: "Dust-Free Eraser (Pack of 20)",
      sku: "ERA-STD-005",
      categoryCode: "DSK",
      supplierName: "Camel Stationery Suppliers",
      description: "Non-toxic dust free white erasers",
      brand: "Faber-Castell",
      unit: "Box",
      packSize: 20,
      sellingPrice: 80,
      costPrice: 55,
      minimumStockLevel: 80,
      reorderQuantity: 200,
      status: "Active",
      initialStock: { "WH-MAIN": 0, "WH-NORTH": 0 }
    },
    {
      name: "Acrylic Color Set 12 Shades",
      sku: "MAR-CLR-006",
      categoryCode: "ART",
      supplierName: "Camel Stationery Suppliers",
      description: "Vibrant fast-drying acrylic colors for artists",
      brand: "Camel",
      unit: "Set",
      packSize: 1,
      sellingPrice: 240,
      costPrice: 170,
      minimumStockLevel: 60,
      reorderQuantity: 150,
      status: "Active",
      initialStock: { "WH-MAIN": 210, "WH-NORTH": 80 }
    }
  ]
};
