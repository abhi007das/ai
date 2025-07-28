import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const AssetAllocation: React.FC = () => {
  const data = [
    { name: 'Stocks', value: 45, color: '#06b6d4' },
    { name: 'Crypto', value: 25, color: '#8b5cf6' },
    { name: 'Options', value: 15, color: '#10b981' },
    { name: 'Forex', value: 10, color: '#f59e0b' },
    { name: 'Cash', value: 5, color: '#64748b' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Asset Allocation</h3>
        <p className="text-sm text-slate-600">Portfolio distribution by asset class</p>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-slate-900">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-900">{item.value}%</span>
              <p className="text-xs text-slate-600">
                ${((item.value / 100) * 247832.50).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Risk Score</span>
          <span className="font-bold text-orange-600">Moderate (6/10)</span>
        </div>
        <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-green-500 to-orange-500 h-2 rounded-full" style={{ width: '60%' }} />
        </div>
      </div>
    </motion.div>
  );
};

export default AssetAllocation;
