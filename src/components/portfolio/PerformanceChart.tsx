import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

const PerformanceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  // Generate sample performance data
  const generateData = (days: number) => {
    const data = [];
    let value = 200000;
    const today = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const randomChange = (Math.random() - 0.45) * 2000;
      value += randomChange;
      
      data.push({
        date: date.toISOString().split('T')[0],
        portfolio: Math.round(value),
        benchmark: Math.round(200000 + (days - i) * 150 + Math.random() * 1000),
      });
    }
    
    return data;
  };

  const getDataForTimeframe = () => {
    switch (timeframe) {
      case '1D': return generateData(1);
      case '1W': return generateData(7);
      case '1M': return generateData(30);
      case '3M': return generateData(90);
      case '1Y': return generateData(365);
      case 'ALL': return generateData(730);
      default: return generateData(30);
    }
  };

  const data = getDataForTimeframe();
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeframe === '1D') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const currentValue = data[data.length - 1]?.portfolio || 0;
  const startValue = data[0]?.portfolio || 0;
  const totalChange = currentValue - startValue;
  const totalChangePercent = (totalChange / startValue) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Portfolio Performance</h3>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-2xl font-bold text-slate-900">
              ${currentValue.toLocaleString()}
            </span>
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              totalChange >= 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {totalChange >= 0 ? '+' : ''}${totalChange.toLocaleString()} ({totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={formatDate}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString()}`, 
                name === 'portfolio' ? 'Portfolio' : 'Benchmark'
              ]}
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={false}
              name="portfolio"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="benchmark"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
        <div className="text-center">
          <p className="text-sm text-slate-600">Best Day</p>
          <p className="text-lg font-bold text-green-600">+$4,247.50</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">Worst Day</p>
          <p className="text-lg font-bold text-red-600">-$2,135.75</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">Volatility</p>
          <p className="text-lg font-bold text-slate-900">12.3%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">Sharpe Ratio</p>
          <p className="text-lg font-bold text-blue-600">2.34</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceChart;
