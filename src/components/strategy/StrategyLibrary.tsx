import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Download, Eye, Play } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  author: string;
  rating: number;
  downloads: number;
  performance: number;
  sharpe: number;
  drawdown: number;
  category: string;
  tags: string[];
  price: number;
}

const StrategyLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const strategies: Strategy[] = [
    {
      id: '1',
      name: 'Momentum Master Pro',
      description: 'Advanced momentum strategy with AI-powered entry/exit signals',
      author: 'QuantMaster',
      rating: 4.8,
      downloads: 1247,
      performance: 23.5,
      sharpe: 1.85,
      drawdown: 8.2,
      category: 'momentum',
      tags: ['AI', 'Momentum', 'High-Frequency'],
      price: 49.99
    },
    {
      id: '2',
      name: 'Mean Reversion Elite',
      description: 'Statistical arbitrage using machine learning predictions',
      author: 'AlgoWizard',
      rating: 4.6,
      downloads: 892,
      performance: 18.7,
      sharpe: 2.1,
      drawdown: 5.4,
      category: 'mean-reversion',
      tags: ['ML', 'Statistical', 'Low-Risk'],
      price: 0
    },
    {
      id: '3',
      name: 'Breakout Hunter',
      description: 'Volatility-based breakout detection with smart filtering',
      author: 'TradePro',
      rating: 4.4,
      downloads: 1563,
      performance: 31.2,
      sharpe: 1.6,
      drawdown: 12.8,
      category: 'breakout',
      tags: ['Volatility', 'Breakout', 'High-Return'],
      price: 29.99
    },
    {
      id: '4',
      name: 'Crypto Arbitrage Bot',
      description: 'Cross-exchange arbitrage opportunities in cryptocurrency markets',
      author: 'CryptoKing',
      rating: 4.9,
      downloads: 2156,
      performance: 45.6,
      sharpe: 2.8,
      drawdown: 3.2,
      category: 'arbitrage',
      tags: ['Crypto', 'Arbitrage', 'Low-Risk'],
      price: 99.99
    }
  ];

  const categories = [
    { id: 'all', label: 'All Strategies' },
    { id: 'momentum', label: 'Momentum' },
    { id: 'mean-reversion', label: 'Mean Reversion' },
    { id: 'breakout', label: 'Breakout' },
    { id: 'arbitrage', label: 'Arbitrage' }
  ];

  const filteredStrategies = strategies.filter(strategy => {
    const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         strategy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         strategy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || strategy.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="relative flex-1 lg:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search strategies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600">
            Upload Strategy
          </button>
        </div>
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStrategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{strategy.name}</h3>
                  {strategy.price === 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      FREE
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-3">{strategy.description}</p>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span>by {strategy.author}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{strategy.rating}</span>
                  </div>
                  <span>{strategy.downloads} downloads</span>
                </div>
              </div>
              
              <div className="text-right">
                {strategy.price > 0 ? (
                  <p className="text-xl font-bold text-slate-900">${strategy.price}</p>
                ) : (
                  <p className="text-xl font-bold text-green-600">FREE</p>
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Performance</p>
                <p className="text-lg font-bold text-green-600">+{strategy.performance}%</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Sharpe</p>
                <p className="text-lg font-bold text-blue-600">{strategy.sharpe}</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Drawdown</p>
                <p className="text-lg font-bold text-red-600">{strategy.drawdown}%</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {strategy.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex-1">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 flex-1">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600">
                <Play className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredStrategies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No strategies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StrategyLibrary;
