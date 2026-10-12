import { Outlet } from 'react-router-dom';
import { Package, TrendingUp, ShoppingCart, Bell } from 'lucide-react';
import AuthFeatureItem from './AuthFeatureItem.jsx';
import WarehouseIllustration from './WarehouseIllustration.jsx';

const features = [
  {
    icon: Package,
    title: 'Real-time Inventory Tracking',
    description: 'Track stock across all warehouses in real-time.',
  },
  {
    icon: TrendingUp,
    title: 'AI Demand Forecasting',
    description: 'Predict demand and never run out of stock.',
  },
  {
    icon: ShoppingCart,
    title: 'Wholesale Order Management',
    description: 'Create, manage and track wholesale orders easily.',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified for low stock and important updates.',
  },
];

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left branding panel */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-50 to-primary-100 px-8 py-10 sm:px-14 sm:py-14 flex flex-col justify-center">
        <div className="max-w-lg mx-auto lg:mx-0 w-full">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold text-gray-900">
              StockWise <span className="text-primary-600">AI</span>
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            ✦ AI-Powered Inventory & Distribution Management
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Smart Wholesale Distribution &amp; Inventory Management
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Manage stationery inventory, track wholesale orders, predict
            demand and grow your business with the power of AI.
          </p>

          <div className="space-y-5 mb-10">
            {features.map((f) => (
              <AuthFeatureItem key={f.title} {...f} />
            ))}
          </div>

          <div className="hidden sm:block">
            <WarehouseIllustration />
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center px-6 py-10 sm:px-10">
        <Outlet />
        <p className="flex items-center gap-2 text-xs text-gray-500 mt-8">
          <span>🛡️ Secure &amp; encrypted</span>
          <span className="text-gray-300">•</span>
          <span>Your data is safe with us</span>
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;