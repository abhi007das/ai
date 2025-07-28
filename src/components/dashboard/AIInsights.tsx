import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const AIInsights: React.FC = () => {
  const insights = [
    {
      type: 'opportunity',
      icon: Target,
      title: 'Breakout Signal',
      description: 'TSLA showing strong momentum above $245 resistance',
      confidence: 87,
      color: 'green'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Risk Alert',
      description: 'High correlation detected in tech portfolio',
      confidence: 92,
      color: 'yellow'
    },
    {
      type: 'trend',
      icon: TrendingUp,
      title: 'Market Trend',
      description: 'AI predicts continued bullish momentum in financials',
      confidence: 78,
      color: 'blue'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">AI Insights</h3>
          <p className="text-sm text-slate-600">Real-time market intelligence</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                insight.color === 'green' ? 'bg-green-100' :
                insight.color === 'yellow' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                <insight.icon className={`w-4 h-4 ${
                  insight.color === 'green' ? 'text-green-600' :
                  insight.color === 'yellow' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-slate-900">{insight.title}</h4>
                  <span className="text-xs font-medium text-slate-500">{insight.confidence}%</span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{insight.description}</p>
                <div className="w-full bg-slate-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full ${
                      insight.color === 'green' ? 'bg-green-500' :
                      insight.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
        View All Insights
      </button>
    </motion.div>
  );
};

export default AIInsights;
