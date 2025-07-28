import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import PortfolioOverview from '../components/portfolio/PortfolioOverview';
import AssetAllocation from '../components/portfolio/AssetAllocation';
import PositionsTable from '../components/portfolio/PositionsTable';
import PerformanceChart from '../components/portfolio/PerformanceChart';

const Portfolio: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Portfolio</h1>
          <p className="text-slate-600 mt-1">Track your investments and performance</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600">
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <PortfolioOverview />

      {/* Performance & Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <AssetAllocation />
        </div>
      </div>

      {/* Positions Table */}
      <PositionsTable />
    </div>
  );
};

export default Portfolio;
