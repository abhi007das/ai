import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Bot,
  Bell,
  Plus,
  Filter,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Strategy,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const BrokerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const brokerStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalStrategies: 23,
    monthlyRevenue: 45620,
    monthlyGrowth: 15.2,
    avgUserPnL: 2847,
    totalTrades: 12456,
    successRate: 67.8
  };

  const recentUsers = [
    { id: 1, name: 'John Smith', email: 'john@email.com', status: 'active', joinDate: '2024-01-15', pnl: 2847, trades: 156 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', status: 'pending', joinDate: '2024-01-14', pnl: 0, trades: 0 },
    { id: 3, name: 'Mike Chen', email: 'mike@email.com', status: 'active', joinDate: '2024-01-13', pnl: -856, trades: 89 },
    { id: 4, name: 'Lisa Davis', email: 'lisa@email.com', status: 'active', joinDate: '2024-01-12', pnl: 4521, trades: 234 },
    { id: 5, name: 'Tom Wilson', email: 'tom@email.com', status: 'inactive', joinDate: '2024-01-10', pnl: 1234, trades: 67 },
  ];

  const brokerStrategies = [
    { id: 1, name: 'Momentum Scalper', type: 'Custom', status: 'active', users: 156, performance: 23.4, risk: 'Medium' },
    { id: 2, name: 'Mean Reversion Pro', type: 'AI Generated', status: 'active', users: 89, performance: 18.7, risk: 'Low' },
    { id: 3, name: 'Breakout Hunter', type: 'Custom', status: 'pending', users: 0, performance: 0, risk: 'High' },
    { id: 4, name: 'Grid Trading Bot', type: 'Template', status: 'active', users: 234, performance: 15.2, risk: 'Medium' },
    { id: 5, name: 'News Sentiment Trader', type: 'AI Generated', status: 'draft', users: 0, performance: 0, risk: 'High' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-900/20 text-green-400',
      pending: 'bg-yellow-900/20 text-yellow-400',
      inactive: 'bg-gray-900/20 text-gray-400',
      draft: 'bg-blue-900/20 text-blue-400',
    };
    return styles[status as keyof typeof styles] || styles.inactive;
  };

  const getRiskBadge = (risk: string) => {
    const styles = {
      Low: 'bg-green-900/20 text-green-400',
      Medium: 'bg-yellow-900/20 text-yellow-400',
      High: 'bg-red-900/20 text-red-400',
    };
    return styles[risk as keyof typeof styles] || styles.Medium;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'strategies', label: 'Strategies', icon: Bot },
    { id: 'analytics', label: 'P&L Analytics', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Broker Dashboard</h1>
            <p className="text-slate-400">Manage your users and trading strategies</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Strategy</span>
          </button>
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
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
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
                  <p className="text-2xl font-bold text-white">{brokerStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">{brokerStats.activeUsers} active users</span>
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
                  <p className="text-slate-400 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">${brokerStats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-900/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+{brokerStats.monthlyGrowth}% this month</span>
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
                  <p className="text-slate-400 text-sm">Active Strategies</p>
                  <p className="text-2xl font-bold text-white">{brokerStats.totalStrategies}</p>
                </div>
                <div className="w-12 h-12 bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">{brokerStats.successRate}% success rate</span>
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
                  <p className="text-slate-400 text-sm">Avg User P&L</p>
                  <p className="text-2xl font-bold text-white">${brokerStats.avgUserPnL.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-cyan-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">{brokerStats.totalTrades} total trades</span>
              </div>
            </motion.div>
          </div>

          {/* Recent Users & Top Strategies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Recent Users</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
              </div>
              <div className="space-y-4">
                {recentUsers.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(user.status)}`}>
                        {user.status}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">{user.joinDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Strategies */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Top Strategies</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300">Manage All</button>
              </div>
              <div className="space-y-4">
                {brokerStrategies.filter(s => s.status === 'active').slice(0, 4).map((strategy) => (
                  <div key={strategy.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                        <Bot className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{strategy.name}</p>
                        <p className="text-xs text-slate-400">{strategy.users} users</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-400">+{strategy.performance}%</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskBadge(strategy.risk)}`}>
                        {strategy.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-slate-600">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">P&L</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Trades</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-white">{user.name.charAt(0)}</span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-sm text-slate-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{user.joinDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${user.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {user.pnl >= 0 ? '+' : ''}${user.pnl.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{user.trades}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-slate-400 hover:text-slate-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-slate-400 hover:text-slate-300">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {activeTab !== 'overview' && activeTab !== 'users' && (
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            {(() => {
              const activeTabData = tabs.find(tab => tab.id === activeTab);
              if (activeTabData?.icon) {
                const IconComponent = activeTabData.icon;
                return <IconComponent className="w-8 h-8 text-slate-400" />;
              }
              return null;
            })()}
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

export default BrokerPanel;