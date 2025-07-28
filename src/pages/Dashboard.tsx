import React from 'react';
import { motion } from 'framer-motion';
import PLHeatmap from '../components/dashboard/PLHeatmap';
import EquityProjection from '../components/dashboard/EquityProjection';
import LivePositions from '../components/dashboard/LivePositions';
import MarketOverview from '../components/dashboard/MarketOverview';
import AIInsights from '../components/dashboard/AIInsights';
import QuickActions from '../components/dashboard/QuickActions';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';
import SocialFeed from '../components/dashboard/SocialFeed';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Trading Dashboard</h1>
          <p className="text-slate-600 mt-1">AI-powered insights and real-time market data</p>
        </div>
        <QuickActions />
      </div>

      {/* Performance Metrics Row */}
      <PerformanceMetrics />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <PLHeatmap />
          <EquityProjection />
          <LivePositions />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <MarketOverview />
          <AIInsights />
          <SocialFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
