import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';
import PLHeatmap from '../components/dashboard/PLHeatmap';
import EquityProjection from '../components/dashboard/EquityProjection';
import LivePositions from '../components/dashboard/LivePositions';
import MarketOverview from '../components/dashboard/MarketOverview';
import AIInsights from '../components/dashboard/AIInsights';
import QuickActions from '../components/dashboard/QuickActions';
import PerformanceMetrics from '../components/dashboard/PerformanceMetrics';
import SocialFeed from '../components/dashboard/SocialFeed';
import { Crown, Shield, Building2, User, TrendingUp, Users, Bot, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, hasPermission } = useAuth();

  const getRoleWelcomeMessage = () => {
    switch (user?.role) {
      case UserRole.SUPER_ADMIN:
        return {
          title: 'Super Admin Dashboard',
          subtitle: 'Platform-wide oversight and management',
          icon: Crown,
          color: 'from-purple-500 to-pink-500'
        };
      case UserRole.ADMIN:
        return {
          title: 'Admin Dashboard',
          subtitle: 'Broker and user management',
          icon: Shield,
          color: 'from-red-500 to-orange-500'
        };
      case UserRole.BROKER:
        return {
          title: 'Broker Dashboard',
          subtitle: 'Manage your users and strategies',
          icon: Building2,
          color: 'from-blue-500 to-cyan-500'
        };
      case UserRole.USER:
        return {
          title: 'Trading Dashboard',
          subtitle: 'AI-powered insights and real-time market data',
          icon: User,
          color: 'from-green-500 to-emerald-500'
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome to the platform',
          icon: TrendingUp,
          color: 'from-gray-500 to-slate-500'
        };
    }
  };

  const roleInfo = getRoleWelcomeMessage();
  const IconComponent = roleInfo.icon;

  // Role-specific quick stats
  const getRoleSpecificStats = () => {
    switch (user?.role) {
      case UserRole.SUPER_ADMIN:
        return [
          { label: 'Total Users', value: '15,420', icon: Users, change: '+23%' },
          { label: 'Platform Revenue', value: '$2.8M', icon: DollarSign, change: '+18%' },
          { label: 'Active Brokers', value: '156', icon: Building2, change: '+12' },
          { label: 'AI Models', value: '47', icon: Bot, change: '+3' },
        ];
      case UserRole.ADMIN:
        return [
          { label: 'Managed Brokers', value: '23', icon: Building2, change: '+2' },
          { label: 'Total Users', value: '3,247', icon: Users, change: '+15%' },
          { label: 'Active Strategies', value: '89', icon: Bot, change: '+7' },
          { label: 'Monthly Revenue', value: '$456K', icon: DollarSign, change: '+12%' },
        ];
      case UserRole.BROKER:
        return [
          { label: 'Your Users', value: '1,247', icon: Users, change: '+8%' },
          { label: 'Monthly Revenue', value: '$45.6K', icon: DollarSign, change: '+15%' },
          { label: 'Active Strategies', value: '23', icon: Bot, change: '+2' },
          { label: 'Avg User P&L', value: '$2,847', icon: TrendingUp, change: '+23%' },
        ];
      case UserRole.USER:
      default:
        return [
          { label: 'Portfolio Value', value: '$24,847', icon: DollarSign, change: '+12%' },
          { label: 'Active Strategies', value: '5', icon: Bot, change: '+1' },
          { label: 'Monthly P&L', value: '$2,847', icon: TrendingUp, change: '+23%' },
          { label: 'Total Trades', value: '156', icon: Users, change: '+45' },
        ];
    }
  };

  const stats = getRoleSpecificStats();

  return (
    <div className="space-y-6">
      {/* Role-specific Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${roleInfo.color} rounded-lg flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{roleInfo.title}</h1>
            <p className="text-slate-400 mt-1">{roleInfo.subtitle}</p>
          </div>
        </div>
        <QuickActions />
      </div>

      {/* Role-specific Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-slate-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Conditional Content Based on Role */}
      {user?.role === UserRole.USER && (
        <>
          {/* Performance Metrics Row - Only for Users */}
          <PerformanceMetrics />

          {/* Main Grid - Full trading dashboard for Users */}
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
        </>
      )}

      {/* For other roles, show simplified dashboard or redirect to role-specific pages */}
      {user?.role !== UserRole.USER && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {user?.role === UserRole.SUPER_ADMIN && (
                <>
                  <button className="w-full text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <div className="font-medium text-white">Platform Management</div>
                    <div className="text-sm text-slate-400">Manage all admins and brokers</div>
                  </button>
                  <button className="w-full text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <div className="font-medium text-white">System Analytics</div>
                    <div className="text-sm text-slate-400">View platform-wide metrics</div>
                  </button>
                </>
              )}
              {user?.role === UserRole.ADMIN && (
                <>
                  <button className="w-full text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <div className="font-medium text-white">Broker Management</div>
                    <div className="text-sm text-slate-400">Manage brokers and approve strategies</div>
                  </button>
                  <button className="w-full text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <div className="font-medium text-white">User Analytics</div>
                    <div className="text-sm text-slate-400">View user performance metrics</div>
                  </button>
                </>
              )}
              {user?.role === UserRole.BROKER && (
                <>
                  <button className="w-full text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <div className="font-medium text-white">User Management</div>
                    <div className="text-sm text-slate-400">Manage your users and their strategies</div>
                  </button>
                  <button className="w-full text-left p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <div className="font-medium text-white">Strategy Creation</div>
                    <div className="text-sm text-slate-400">Create and manage trading strategies</div>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-white">New user registered</p>
                  <p className="text-xs text-slate-400">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-900/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-white">Strategy approved</p>
                  <p className="text-xs text-slate-400">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-900/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-white">Revenue milestone reached</p>
                  <p className="text-xs text-slate-400">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
