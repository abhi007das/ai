import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Zap, Users, BarChart3 } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      label: 'New Strategy',
      icon: Plus,
      color: 'from-cyan-500 to-blue-500',
      action: () => console.log('New Strategy')
    },
    {
      label: 'Quick Trade',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      action: () => console.log('Quick Trade')
    },
    {
      label: 'Social Feed',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      action: () => console.log('Social Feed')
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      action: () => console.log('Analytics')
    }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.action}
          className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${action.color} text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200`}
        >
          <action.icon className="w-4 h-4" />
          <span>{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
