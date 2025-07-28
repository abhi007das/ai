import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Zap } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Advanced Analytics</h1>
          <p className="text-slate-600 mt-1">Deep insights and predictive analytics</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Activity className="w-4 h-4" />
            <span>Real-time Data</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600">
            <Zap className="w-4 h-4" />
            <span>AI Insights</span>
          </button>
        </div>
      </div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-12 text-center border border-purple-200"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Advanced Analytics Coming Soon</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          We're building powerful analytics tools including predictive market analysis, 
          sentiment tracking, volatility forecasting, and AI-driven insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: 'Predictive Analytics',
              description: 'AI-powered market predictions and trend analysis',
              icon: TrendingUp
            },
            {
              title: 'Sentiment Analysis',
              description: 'Real-time social media and news sentiment tracking',
              icon: Activity
            },
            {
              title: 'Risk Management',
              description: 'Advanced portfolio risk metrics and optimization',
              icon: BarChart3
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
