import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Key,
  Plus,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Shield,
  Wifi,
  WifiOff,
  Settings,
  Link as LinkIcon,
  Unlink
} from 'lucide-react';

interface ApiKey {
  id: string;
  broker: string;
  name: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  lastUsed: string;
  createdAt: string;
  permissions: string[];
}

const ApiKeys: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [newApiKey, setNewApiKey] = useState({
    broker: '',
    name: '',
    apiKey: '',
    apiSecret: '',
    permissions: [] as string[],
  });

  const mockApiKeys: ApiKey[] = [
    {
      id: '1',
      broker: 'Zerodha',
      name: 'Main Trading Account',
      status: 'active',
      lastUsed: '2 hours ago',
      createdAt: '2024-01-10',
      permissions: ['read', 'trade', 'funds']
    },
    {
      id: '2',
      broker: 'Angel One',
      name: 'Backup Account',
      status: 'inactive',
      lastUsed: '2 days ago',
      createdAt: '2024-01-08',
      permissions: ['read', 'trade']
    },
    {
      id: '3',
      broker: 'Upstox',
      name: 'Test Account',
      status: 'error',
      lastUsed: 'Never',
      createdAt: '2024-01-05',
      permissions: ['read']
    },
  ];

  const supportedBrokers = [
    { id: 'zerodha', name: 'Zerodha', logo: '🟠', description: 'India\'s largest discount broker' },
    { id: 'angel-one', name: 'Angel One', logo: '🔴', description: 'Full-service stockbroker' },
    { id: 'upstox', name: 'Upstox', logo: '🟣', description: 'Technology-driven broker' },
    { id: 'icici-direct', name: 'ICICI Direct', logo: '🔵', description: 'Bank-backed broker' },
    { id: 'hdfc-securities', name: 'HDFC Securities', logo: '🟡', description: 'Bank-backed broker' },
    { id: 'kotak-securities', name: 'Kotak Securities', logo: '🔴', description: 'Bank-backed broker' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'inactive':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/20 text-green-400';
      case 'inactive':
        return 'bg-yellow-900/20 text-yellow-400';
      case 'error':
        return 'bg-red-900/20 text-red-400';
      case 'pending':
        return 'bg-orange-900/20 text-orange-400';
      default:
        return 'bg-gray-900/20 text-gray-400';
    }
  };

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const handleAddApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding API key:', newApiKey);
    setShowAddForm(false);
    setNewApiKey({ broker: '', name: '', apiKey: '', apiSecret: '', permissions: [] });
  };

  const handlePermissionChange = (permission: string) => {
    setNewApiKey(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">API Keys</h1>
            <p className="text-slate-400">Manage your broker API connections</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add API Key</span>
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-300">Security Notice</h4>
            <p className="text-sm text-blue-200 mt-1">
              Your API keys are encrypted and stored securely. We never store your API secrets in plain text.
              Only use API keys with the minimum required permissions for your trading strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Current API Keys */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Connected Accounts</h2>
        
        {mockApiKeys.length === 0 ? (
          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 text-center">
            <Key className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No API Keys Added</h3>
            <p className="text-slate-400 mb-4">Add your first broker API key to start automated trading</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add API Key
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {mockApiKeys.map((apiKey) => (
              <motion.div
                key={apiKey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 p-6 rounded-lg border border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                      {supportedBrokers.find(b => b.name === apiKey.broker)?.logo || '🔑'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(apiKey.status)}`}>
                          {apiKey.status}
                        </span>
                      </div>
                      <p className="text-slate-400">{apiKey.broker}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                        <span>Last used: {apiKey.lastUsed}</span>
                        <span>•</span>
                        <span>Added: {apiKey.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(apiKey.status)}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => toggleApiKeyVisibility(apiKey.id)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="View API Key"
                      >
                        {showApiKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* API Key Details */}
                {showApiKey[apiKey.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-slate-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">API Key</label>
                        <div className="bg-slate-700 p-3 rounded font-mono text-sm text-slate-300">
                          kite_••••••••••••••••••••••••••••••••
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Permissions</label>
                        <div className="flex flex-wrap gap-2">
                          {apiKey.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded-full"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Supported Brokers */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Supported Brokers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportedBrokers.map((broker) => (
            <div key={broker.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{broker.logo}</div>
                <div>
                  <h3 className="font-medium text-white">{broker.name}</h3>
                  <p className="text-sm text-slate-400">{broker.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add API Key Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-lg border border-slate-700 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Add API Key</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddApiKey} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Broker</label>
                  <select
                    value={newApiKey.broker}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, broker: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a broker</option>
                    {supportedBrokers.map((broker) => (
                      <option key={broker.id} value={broker.name}>{broker.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Account Name</label>
                  <input
                    type="text"
                    value={newApiKey.name}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Main Trading Account"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
                  <input
                    type="text"
                    value={newApiKey.apiKey}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, apiKey: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                    placeholder="Enter your API key"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">API Secret</label>
                  <input
                    type="password"
                    value={newApiKey.apiSecret}
                    onChange={(e) => setNewApiKey(prev => ({ ...prev, apiSecret: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                    placeholder="Enter your API secret"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Permissions</label>
                  <div className="space-y-2">
                    {['read', 'trade', 'funds'].map((permission) => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newApiKey.permissions.includes(permission)}
                          onChange={() => handlePermissionChange(permission)}
                          className="rounded border-slate-600 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-slate-300 capitalize">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add API Key
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ApiKeys;