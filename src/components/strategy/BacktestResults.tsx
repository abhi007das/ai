import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, Calendar } from 'lucide-react';

const BacktestResults: React.FC = () => {
  // Generate sample backtest data
  const equityCurve = Array.from({ length: 252 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (252 - i));
    const baseReturn = 100000;
    const randomWalk = Math.random() * 0.02 - 0.01;
    const trend = i * 50;
    
    return {
      date: date.toISOString().split('T')[0],
      equity: baseReturn + trend + (Math.random() * 10000),
      benchmark: baseReturn + (i * 30),
    };
  });

  const monthlyReturns = [
    { month: 'Jan', returns: 8.5 },
    { month: 'Feb', returns: -2.3 },
    { month: 'Mar', returns: 12.1 },
    { month: 'Apr', returns: 5.7 },
    { month: 'May', returns: -1.8 },
    { month: 'Jun', returns: 9.4 },
    { month: 'Jul', returns: 15.2 },
    { month: 'Aug', returns: -4.1 },
    { month: 'Sep', returns: 7.8 },
    { month: 'Oct', returns: 11.3 },
    { month: 'Nov', returns: 6.9 },
    { month: 'Dec', returns: 4.2 },
  ];

  const metrics = [
    {
      label: 'Total Return',
      value: '47.8%',
      change: '+15.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      label: 'Sharpe Ratio',
      value: '2.34',
      change: '+0.8',
      trend: 'up',
      icon: Target,
      color: 'blue'
    },
    {
      label: 'Max Drawdown',
      value: '8.5%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown,
      color: 'red'
    },
    {
      label: 'Win Rate',
      value: '68.4%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'purple'
    },
    {
      label: 'Profit Factor',
      value: '1.85',
      change: '+0.3',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    },
    {
      label: 'Volatility',
      value: '12.3%',
      change: '-1.5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'yellow'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Backtest Results</h3>
          <p className="text-sm text-slate-600">Performance analysis from 2023-01-01 to 2023-12-31</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Calendar className="w-4 h-4" />
            <span>Change Period</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600">
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                <metric.icon className={`w-4 h-4 text-${metric.color}-600`} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                metric.trend === 'up' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {metric.change}
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">{metric.value}</h4>
              <p className="text-sm text-slate-600">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Equity Curve */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
      >
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-slate-900">Equity Curve</h4>
          <p className="text-sm text-slate-600">Strategy performance vs benchmark</p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={equityCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`, 
                  name === 'equity' ? 'Strategy' : 'Benchmark'
                ]}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="equity"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
                name="equity"
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
      </motion.div>

      {/* Monthly Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900">Monthly Returns</h4>
            <p className="text-sm text-slate-600">Performance breakdown by month</p>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Returns']} />
                <Bar 
                  dataKey="returns" 
                  fill="#06b6d4"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Trade Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900">Trade Statistics</h4>
            <p className="text-sm text-slate-600">Detailed trading metrics</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-slate-600">Total Trades</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-slate-600">Winning Trades</span>
              <span className="font-semibold text-green-600">853 (68.4%)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-slate-600">Losing Trades</span>
              <span className="font-semibold text-red-600">394 (31.6%)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-slate-600">Average Win</span>
              <span className="font-semibold text-green-600">$347.50</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-slate-600">Average Loss</span>
              <span className="font-semibold text-red-600">-$188.25</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-slate-600">Largest Win</span>
              <span className="font-semibold text-green-600">$2,450.00</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-slate-600">Largest Loss</span>
              <span className="font-semibold text-red-600">-$892.50</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Average Trade Duration</span>
              <span className="font-semibold">2.3 days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BacktestResults;
