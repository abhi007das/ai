import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, X, MoreVertical } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Position {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  strategy: string;
}

const LivePositions: React.FC = () => {
  const [positions] = useState<Position[]>(() => {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX'];
    const strategies = ['Momentum AI', 'Mean Reversion', 'Breakout Pro', 'Scalp Master'];
    
    return Array.from({ length: 8 }, (_, i) => {
      const symbol = symbols[i];
      const side = Math.random() > 0.5 ? 'long' : 'short';
      const entryPrice = faker.number.float({ min: 50, max: 300, fractionDigits: 2 });
      const pnlPercent = faker.number.float({ min: -5, max: 8, fractionDigits: 2 });
      const currentPrice = entryPrice * (1 + (side === 'long' ? pnlPercent : -pnlPercent) / 100);
      const size = faker.number.int({ min: 10, max: 1000 });
      const pnl = (currentPrice - entryPrice) * size * (side === 'long' ? 1 : -1);
      
      return {
        id: faker.string.uuid(),
        symbol,
        side,
        size,
        entryPrice,
        currentPrice,
        pnl,
        pnlPercent: side === 'long' ? pnlPercent : -pnlPercent,
        strategy: strategies[Math.floor(Math.random() * strategies.length)]
      };
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Live Positions</h3>
          <p className="text-sm text-slate-600">{positions.length} active trades</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-blue-600 transition-colors">
          Close All
        </button>
      </div>

      <div className="space-y-3">
        {positions.map((position, index) => (
          <motion.div
            key={position.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-900">{position.symbol}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    position.side === 'long' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {position.side.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-slate-600">{position.strategy}</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-slate-600">Size</p>
                <p className="font-medium text-slate-900">{position.size}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-slate-600">Entry</p>
                <p className="font-medium text-slate-900">${position.entryPrice.toFixed(2)}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-slate-600">Current</p>
                <p className="font-medium text-slate-900">${position.currentPrice.toFixed(2)}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-slate-600">P&L</p>
                <div className="flex items-center space-x-1">
                  {position.pnl >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`font-bold ${
                    position.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${position.pnl.toFixed(2)}
                  </span>
                  <span className={`text-sm ${
                    position.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-1 rounded hover:bg-slate-200">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
                <button className="p-1 rounded hover:bg-red-100 text-red-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LivePositions;
