import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Crown,
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  Shield,
  Settings,
  Database,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart,
  Globe
} from 'lucide-react';

const SuperAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const platformStats = {
    totalUsers: 15420,
    totalAdmins: 12,
    totalBrokers: 156,
    totalRevenue: 2847560,
    monthlyGrowth: 23.5,
    activeStrategies: 1247,
    totalTrades: 89432,
    systemUptime: 99.97
  };

  const recentActivities = [
    { id: 1, type: 'user_registered', message: 'New user registered: john.doe@email.com', time: '2 minutes ago', status: 'info' },
    { id: 2, type: 'broker_approved', message: 'Broker application approved: TradePro LLC', time: '15 minutes ago', status: 'success' },
    { id: 3, type: 'system_alert', message: 'High API usage detected on server cluster 3', time: '1 hour ago', status: 'warning' },
    { id: 4, type: 'revenue_milestone', message: 'Monthly revenue target exceeded by 15%', time: '2 hours ago', status: 'success' },
    { id: 5, type: 'admin_action', message: 'Admin Sarah Johnson updated platform policies', time: '3 hours ago', status: 'info' },
  ];

  const systemHealth = [
    { service: 'Trading Engine', status: 'healthy', uptime: '99.98%', response: '12ms' },
    { service: 'Database Cluster', status: 'healthy', uptime: '99.95%', response: '8ms' },
    { service: 'API Gateway', status: 'warning', uptime: '99.85%', response: '45ms' },
    { service: 'Analytics Service', status: 'healthy', uptime: '99.92%', response: '22ms' },
    { service: 'Notification Service', status: 'healthy', uptime: '99.89%', response: '15ms' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'broker_approved':
        return <Building2 className="w-4 h-4 text-green-500" />;
      case 'system_alert':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'revenue_milestone':
        return <DollarSign className="w-4 h-4 text-green-500" />;
      case 'admin_action':
        return <Shield className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'system', label: 'System Health', icon: Activity },
    { id: 'revenue', label: 'Revenue Analytics', icon: DollarSign },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Super Admin Dashboard</h1>
            <p className="text-slate-400">Platform-wide management and analytics</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-green-900/20 rounded-lg">
          <Globe className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400">All Systems Operational</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 p-6 rounded-lg border border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{platformStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+{platformStats.monthlyGrowth}% this month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 p-6 rounded-lg border border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${platformStats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+18.2% from last month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 p-6 rounded-lg border border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Brokers</p>
                  <p className="text-2xl font-bold text-white">{platformStats.totalBrokers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+12 new this month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800 p-6 rounded-lg border border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">System Uptime</p>
                  <p className="text-2xl font-bold text-white">{platformStats.systemUptime}%</p>
                </div>
                <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">Excellent performance</span>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity & System Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{activity.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">System Health</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">Details</button>
              </div>
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="text-sm font-medium text-white">{service.service}</p>
                        <p className="text-xs text-slate-400">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-300">{service.response}</p>
                      <p className="text-xs text-slate-400">avg response</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs content would go here */}
      {activeTab !== 'overview' && (
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {tabs.find(tab => tab.id === activeTab)?.label} Panel
          </h3>
          <p className="text-slate-400">
            This section is under development. Advanced {activeTab} management features will be available here.
          </p>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;