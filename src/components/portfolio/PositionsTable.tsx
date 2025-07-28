import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Search, Filter, MoreVertical } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Position {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'option' | 'forex';
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  pnl: number;
  pnlPercent: number;
  allocation: number;
}

const PositionsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'stock' | 'crypto' | 'option' | 'forex'>('all');
  const [sortBy, setSortBy] = useState<'symbol' | 'pnl' | 'allocation' | 'marketValue'>('marketValue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const positions: Position[] = [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      type: 'stock',
      quantity: 100,
      avgPrice: 175.50,
      currentPrice: 182.25,
      marketValue: 18225,
      pnl: 675,
      pnlPercent: 3.85,
      allocation: 7.35
    },
    {
      id: '2',
      symbol: 'BTC',
      name: 'Bitcoin',
      type: 'crypto',
      quantity: 0.5,
      avgPrice: 45000,
      currentPrice: 48500,
      marketValue: 24250,
      pnl: 1750,
      pnlPercent: 7.78,
      allocation: 9.79
    },
    {
      id: '3',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      type: 'stock',
      quantity: 50,
      avgPrice: 240.00,
      currentPrice: 235.75,
      marketValue: 11787.50,
      pnl: -212.50,
      pnlPercent: -1.77,
      allocation: 4.75
    },
    // Add more positions...
  ].concat(
    Array.from({ length: 15 }, (_, i) => {
      const symbols = ['MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'ETH', 'SOL', 'ADA', 'EUR/USD', 'GBP/USD'];
      const types: ('stock' | 'crypto' | 'forex')[] = ['stock', 'crypto', 'forex'];
      const avgPrice = faker.number.float({ min: 10, max: 500, fractionDigits: 2 });
      const currentPrice = avgPrice * faker.number.float({ min: 0.85, max: 1.15, fractionDigits: 4 });
      const quantity = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 });
      const marketValue = currentPrice * quantity;
      const pnl = marketValue - (avgPrice * quantity);
      
      return {
        id: faker.string.uuid(),
        symbol: symbols[i % symbols.length],
        name: faker.company.name(),
        type: types[Math.floor(Math.random() * types.length)],
        quantity,
        avgPrice,
        currentPrice,
        marketValue,
        pnl,
        pnlPercent: (pnl / (avgPrice * quantity)) * 100,
        allocation: (marketValue / 247832.50) * 100
      };
    })
  );

  const filteredPositions = positions
    .filter(position => {
      const matchesSearch = position.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           position.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || position.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const direction = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'symbol':
          return direction * a.symbol.localeCompare(b.symbol);
        case 'pnl':
          return direction * (a.pnl - b.pnl);
        case 'allocation':
          return direction * (a.allocation - b.allocation);
        case 'marketValue':
          return direction * (a.marketValue - b.marketValue);
        default:
          return 0;
      }
    });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'stock': return 'bg-blue-100 text-blue-800';
      case 'crypto': return 'bg-purple-100 text-purple-800';
      case 'option': return 'bg-orange-100 text-orange-800';
      case 'forex': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-slate-200"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Positions</h3>
            <p className="text-sm text-slate-600">{filteredPositions.length} holdings</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="stock">Stocks</option>
              <option value="crypto">Crypto</option>
              <option value="option">Options</option>
              <option value="forex">Forex</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center space-x-1 hover:text-slate-700"
                >
                  <span>Symbol</span>
                  {sortBy === 'symbol' && (
                    <TrendingUp className={`w-3 h-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Avg Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('marketValue')}
                  className="flex items-center space-x-1 hover:text-slate-700 ml-auto"
                >
                  <span>Market Value</span>
                  {sortBy === 'marketValue' && (
                    <TrendingUp className={`w-3 h-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('pnl')}
                  className="flex items-center space-x-1 hover:text-slate-700 ml-auto"
                >
                  <span>P&L</span>
                  {sortBy === 'pnl' && (
                    <TrendingUp className={`w-3 h-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('allocation')}
                  className="flex items-center space-x-1 hover:text-slate-700 ml-auto"
                >
                  <span>Allocation</span>
                  {sortBy === 'allocation' && (
                    <TrendingUp className={`w-3 h-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredPositions.map((position, index) => (
              <motion.tr
                key={position.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="hover:bg-slate-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{position.symbol}</div>
                    <div className="text-sm text-slate-500">{position.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(position.type)}`}>
                    {position.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-900">
                  {position.quantity.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-900">
                  ${position.avgPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-900">
                  ${position.currentPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-900">
                  ${position.marketValue.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className={`${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <div className="font-medium">
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </div>
                    <div className="text-xs">
                      ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-900">
                  {position.allocation.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPositions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No positions found.</p>
        </div>
      )}
    </motion.div>
  );
};

export default PositionsTable;
