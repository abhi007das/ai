import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap } from 'lucide-react';

const EquityProjection: React.FC = () => {
  const generateProjectionData = () => {
    const data = [];
    let equity = 100000;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Historical data (first 15 days)
      if (i < 15) {
        equity += (Math.random() - 0.4) * 2000;
        data.push({
          date: date.toISOString().split('T')[0],
          equity: Math.round(equity),
          type: 'historical'
        });
      } else {
        // AI prediction (last 15 days)
        equity += (Math.random() + 0.2) * 1500;
        data.push({
          date: date.toISOString().split('T')[0],
          equity: Math.round(equity),
          type: 'prediction'
        });
      }
    }
    
    return data;
  };

  const data = generateProjectionData();
  const currentEquity = data[14].equity;
  const projectedEquity = data[29].equity;
  const projectedGain = projectedEquity - currentEquity;
  const projectedGainPercent = (projectedGain / currentEquity) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">AI Equity Projection</h3>
          <p className="text-sm text-slate-600">30-day predictive analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-slate-600">Projected Gain</p>
            <p className="text-lg font-bold text-green-600">
              +${projectedGain.toLocaleString()} ({projectedGainPercent.toFixed(1)}%)
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Equity']}
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Line
              type="monotone"
              dataKey="equity"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={false}
              strokeDasharray={(entry, index) => data[index]?.type === 'prediction' ? '5 5' : '0'}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2">
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-sm text-slate-600">Target Return</p>
          <p className="text-lg font-bold text-slate-900">15.2%</p>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2">
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-sm text-slate-600">AI Confidence</p>
          <p className="text-lg font-bold text-slate-900">87%</p>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-slate-600">Win Rate</p>
          <p className="text-lg font-bold text-slate-900">73.5%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default EquityProjection;
