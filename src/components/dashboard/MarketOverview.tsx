import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketOverview: React.FC = () => {
  const marketData = [
    { symbol: 'SPY', price: 442.85, change: 2.34, changePercent: 0.53 },
    { symbol: 'QQQ', price: 368.92, change: -1.45, changePercent: -0.39 },
    { symbol: 'IWM', price: 198.76, change: 3.21, changePercent: 1.64 },
    { symbol: 'DIA', price: 344.12, change: 0.87, changePercent: 0.25 },
    { symbol: 'VIX', price: 18.45, change: -2.13, changePercent: -10.34 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Market Overview</h3>
        <p className="text-sm text-slate-600">Major indices and volatility</p>
      </div>

      <div className="space-y-4">
        {marketData.map((item, index) => (
          <motion.div
            key={item.symbol}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
          >
            <div>
              <span className="font-semibold text-slate-900">{item.symbol}</span>
              <p className="text-sm text-slate-600">${item.price.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <div className="text-right">
                <p className={`font-medium ${
                  item.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                </p>
                <p className={`text-sm ${
                  item.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MarketOverview;
