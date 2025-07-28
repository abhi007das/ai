import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Lock, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      {/* Settings Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-12 text-center border border-slate-200"
      >
        <div className="w-24 h-24 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <SettingsIcon className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Settings Panel Coming Soon</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Comprehensive settings for account management, security preferences, 
          notification controls, and trading configurations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: 'Profile Settings',
              description: 'Update your personal information and preferences',
              icon: User
            },
            {
              title: 'Security',
              description: 'Manage passwords, 2FA, and security settings',
              icon: Lock
            },
            {
              title: 'Notifications',
              description: 'Configure alerts and notification preferences',
              icon: Bell
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-500 rounded-lg flex items-center justify-center mb-4">
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

export default Settings;
