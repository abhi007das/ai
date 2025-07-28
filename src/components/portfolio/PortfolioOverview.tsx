import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Percent, Activity, Clock } from 'lucide-react';

const PortfolioOverview: React.FC = () => {
  const metrics = [
    {
      label: 'Total Value',
      value: '$247,832.50',
      change: '+$12,847.50',
      changePercent: '+5.47%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Total P&L',
      value: '+$47,832.50',
      change: '+$3,247.50',
      changePercent: '+7.28%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      label: 'Today\'s P&L',
      value: '+$2,847.50',
      change: '+$847.50',
      changePercent: '+1.15%',
      trend: 'up',
      icon: Activity,
      color: 'blue'
    },
    {
      label: 'Success Rate',
      value: '73.2%',
      change: '+2.1%',
      changePercent: '',
      trend: 'up',
      icon: Percent,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
              <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              metric.trend === 'up' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {metric.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{metric.changePercent}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">{metric.label}</p>
              <p className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PortfolioOverview;
