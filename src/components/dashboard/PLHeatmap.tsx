import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const PLHeatmap: React.FC = () => {
  const generateHeatmapData = () => {
    const data = [];
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX'];
    const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d'];
    
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 6; j++) {
        const pnl = (Math.random() - 0.5) * 1000;
        data.push({
          symbol: symbols[i],
          timeframe: timeframes[j],
          pnl,
          intensity: Math.abs(pnl) / 500,
        });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">P&L Heatmap</h3>
          <p className="text-sm text-slate-600">Real-time profit/loss by symbol and timeframe</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">Loss</span>
          <div className="w-16 h-3 bg-gradient-to-r from-red-500 to-green-500 rounded"></div>
          <span className="text-xs text-slate-500">Profit</span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1">
        {/* Header row */}
        <div></div>
        {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
          <div key={tf} className="text-xs font-medium text-slate-600 text-center p-2">
            {tf}
          </div>
        ))}

        {/* Data rows */}
        {['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX'].map((symbol, symbolIndex) => (
          <React.Fragment key={symbol}>
            <div className="text-xs font-medium text-slate-700 p-2 flex items-center">
              {symbol}
            </div>
            {[0, 1, 2, 3, 4, 5].map((tfIndex) => {
              const dataPoint = heatmapData.find(
                d => d.symbol === symbol && d.timeframe === ['1m', '5m', '15m', '1h', '4h', '1d'][tfIndex]
              );
              const isProfit = dataPoint!.pnl > 0;
              const intensity = Math.min(dataPoint!.intensity, 1);
              
              return (
                <motion.div
                  key={`${symbol}-${tfIndex}`}
                  whileHover={{ scale: 1.1 }}
                  className={`
                    aspect-square rounded-sm flex items-center justify-center cursor-pointer
                    ${isProfit 
                      ? `bg-green-${Math.ceil(intensity * 5) * 100 + 100}` 
                      : `bg-red-${Math.ceil(intensity * 5) * 100 + 100}`
                    }
                  `}
                  style={{
                    backgroundColor: isProfit 
                      ? `rgba(34, 197, 94, ${0.2 + intensity * 0.8})` 
                      : `rgba(239, 68, 68, ${0.2 + intensity * 0.8})`
                  }}
                  title={`${symbol} ${['1m', '5m', '15m', '1h', '4h', '1d'][tfIndex]}: $${dataPoint!.pnl.toFixed(2)}`}
                >
                  {isProfit ? (
                    <TrendingUp className="w-3 h-3 text-green-800" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-800" />
                  )}
                </motion.div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default PLHeatmap;
