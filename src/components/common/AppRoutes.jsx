import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage.jsx';
import InventoryPage from '../../pages/InventoryPage.jsx';
import DashboardPage from '../../pages/DashboardPage.jsx';
import SalesOrdersPage from '../../pages/SalesOrdersPage.jsx';
import CustomersPage from '../../pages/CustomersPage.jsx';
import SettingsPage from '../../pages/SettingsPage.jsx';
import AboutPage from '../../pages/AboutPage.jsx';
import ContactPage from '../../pages/ContactPage.jsx';
import PricingPage from '../../pages/PricingPage.jsx';
import AIForecastingPage from '../../pages/AIForecastingPage.jsx';
import WarehousesPage from '../../pages/WarehousesPage.jsx';
import SmartAlertsPage from '../../pages/SmartAlertsPage.jsx';
import ReportsPage from '../../pages/ReportsPage.jsx';
import AuthLayout from './AuthLayout.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages share the split-screen AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Protected App pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/sales-orders" element={<SalesOrdersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/ai-forecasting" element={<AIForecastingPage />} />
        <Route path="/warehouses" element={<WarehousesPage />} />
        <Route path="/smart-alerts" element={<SmartAlertsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;