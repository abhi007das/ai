import React from 'react';
import { Menu, Bell, User, Search, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search strategies, symbols..."
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Market Status */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
            <Globe className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Markets Open</span>
          </div>

          {/* P&L Display */}
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-cyan-50 rounded-lg"
          >
            <span className="text-sm text-slate-600">Today P&L:</span>
            <span className="text-sm font-bold text-cyan-600">+$2,847.50</span>
          </motion.div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-slate-100">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium">John Trader</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
