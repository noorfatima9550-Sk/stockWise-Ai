import {
  Boxes,
  ShoppingCart,
  BrainCircuit,
  Warehouse,
  BellRing,
  FileBarChart2,
  PackagePlus,
  ClipboardList,
  Truck,
  Sparkles,
  LineChart
} from "lucide-react";

export const brand = {
  name: "StockWise AI",
  tagline: "AI-Powered Wholesale Distribution & Inventory Management",
  domain: "Stationery Wholesale"
};

export const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Solutions", href: "/#solutions", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const heroTrustPoints = [
  "14-Day Free Trial",
  "No Credit Card Required",
  "Easy Setup"
];

export const dashboardStats = [
  { label: "Total Revenue", value: "\u20B924.8L", change: "+12.4%", trend: "up" },
  { label: "Total Orders", value: "1,284", change: "+8.2%", trend: "up" },
  { label: "Total Products", value: "8,940", change: "+4.1%", trend: "up" },
  { label: "Total Profit", value: "\u20B96.2L", change: "+10.6%", trend: "up" }
];

export const salesOverview = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 15 },
  { month: "Mar", value: 14 },
  { month: "Apr", value: 19 },
  { month: "May", value: 17 },
  { month: "Jun", value: 22 },
  { month: "Jul", value: 20 },
  { month: "Aug", value: 26 },
  { month: "Sep", value: 24 },
  { month: "Oct", value: 31 }
];

export const aiInsights = [
  { label: "18 items need reorder", type: "reorder" },
  { label: "AI Forecast: next month demand", value: "+21%", type: "forecast" }
];

export const recentOrders = [
  { id: "#SO-1024", customer: "Sharma Stationers", amount: "\u20B918,500", status: "Paid" },
  { id: "#SO-1023", customer: "Bright Book Depot", amount: "\u20B912,200", status: "Pending" },
  { id: "#SO-1022", customer: "Om Traders", amount: "\u20B915,900", status: "Partial" }
];

export const sidebarNavItems = [
  "Dashboard",
  "Products",
  "Inventory",
  "Sales Orders",
  "Purchase Orders",
  "Customers",
  "Suppliers",
  "Warehouses",
  "Reports",
  "AI Insights",
  "Settings"
];

export const featureCards = [
  {
    icon: Boxes,
    color: "bg-blue-50 text-blue-600",
    title: "Inventory Management",
    description: "Real-time stock tracking across all warehouses",
    href: "/inventory"
  },
  {
    icon: ShoppingCart,
    color: "bg-emerald-50 text-emerald-600",
    title: "Wholesale Orders",
    description: "Create, manage and track wholesale orders easily",
    href: "/sales-orders"
  },
  {
    icon: BrainCircuit,
    color: "bg-violet-50 text-violet-600",
    title: "AI Forecasting",
    description: "Predict demand and optimize your stationery inventory",
    href: "/ai-forecasting"
  },
  {
    icon: Warehouse,
    color: "bg-amber-50 text-amber-600",
    title: "Multi-Warehouse",
    description: "Manage multiple warehouses seamlessly",
    href: "/warehouses"
  },
  {
    icon: BellRing,
    color: "bg-rose-50 text-rose-600",
    title: "Smart Alerts",
    description: "Get notified for low stock and important updates",
    href: "/smart-alerts"
  },
  {
    icon: FileBarChart2,
    color: "bg-sky-50 text-sky-600",
    title: "Powerful Reports",
    description: "Detailed insights to grow your stationery business",
    href: "/reports"
  }
];

export const howItWorksSteps = [
  {
    icon: PackagePlus,
    title: "Add Products",
    description: "Add your stationery items and stock details"
  },
  {
    icon: ClipboardList,
    title: "Process Orders",
    description: "Create and manage wholesale orders"
  },
  {
    icon: Truck,
    title: "Track Inventory",
    description: "Real-time tracking across locations"
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description: "AI analyzes sales and seasonal demand"
  },
  {
    icon: LineChart,
    title: "Smart Decisions",
    description: "Get insights and grow your business"
  }
];

export const whyChooseUs = [
  "AI-powered demand forecasting",
  "Reduce stockouts and overstock",
  "Increase profits and efficiency",
  "Easy to use and super fast",
  "Secure, reliable and scalable",
  "Dedicated support 24/7"
];

export const footerLinks = {
  Product: ["Features", "Pricing", "AI Insights", "Integrations"],
  Solutions: ["Stationery Wholesalers", "Distributors", "Retailers", "Multi-warehouse"],
  Company: ["About Us", "Contact Us", "Careers", "Blog"],
  Support: ["Help Center", "Documentation", "Privacy Policy", "Terms of Service"]
};

export const heroBadge = {
  icon: Sparkles,
  label: "AI-Powered Stationery Inventory & Distribution"
};
