import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Users,
  TrendingUp,
  Settings,
  Shield,
  Wallet,
  X,
  Zap,
  Activity,
  UserCog,
  Building2,
  Key,
  Crown,
  Database,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  path: string;
  icon: React.ComponentType<any>;
  label: string;
  roles?: UserRole[];
  permission?: string;
}

const navItems: NavItem[] = [
  { path: '/dashboard', icon: BarChart3, label: 'Dashboard', permission: 'viewDashboard' },
  { path: '/strategy-builder', icon: Bot, label: 'AI Strategy Builder', permission: 'selectStrategies' },
  { path: '/social-trading', icon: Users, label: 'Social Trading', permission: 'selectStrategies' },
  { path: '/portfolio', icon: Wallet, label: 'Portfolio', permission: 'viewDashboard' },
  { path: '/analytics', icon: TrendingUp, label: 'Analytics', permission: 'viewAnalytics' },
  
  // Super Admin only
  { path: '/super-admin', icon: Crown, label: 'Super Admin', roles: [UserRole.SUPER_ADMIN] },
  { path: '/platform-settings', icon: Database, label: 'Platform Settings', roles: [UserRole.SUPER_ADMIN] },
  { path: '/audit-logs', icon: FileText, label: 'Audit Logs', roles: [UserRole.SUPER_ADMIN] },
  
  // Admin and above
  { path: '/admin', icon: Shield, label: 'Admin Panel', permission: 'manageBrokers' },
  { path: '/user-management', icon: UserCog, label: 'User Management', permission: 'manageUsers' },
  
  // Broker and above
  { path: '/broker-panel', icon: Building2, label: 'Broker Panel', permission: 'createUsers' },
  
  // User and above
  { path: '/api-keys', icon: Key, label: 'API Keys', permission: 'addApiKeys' },
  { path: '/settings', icon: Settings, label: 'Settings', permission: 'viewDashboard' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasPermission } = useAuth();

  const isNavItemVisible = (item: NavItem): boolean => {
    // Check role-based access
    if (item.roles && item.roles.length > 0) {
      return user ? item.roles.includes(user.role) : false;
    }
    
    // Check permission-based access
    if (item.permission) {
      return hasPermission(item.permission as any);
    }
    
    return true;
  };

  const visibleNavItems = navItems.filter(isNavItemVisible);
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-800 border-r border-slate-700 lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AlgoTrade Pro</h1>
                <p className="text-xs text-slate-400">AI-Powered Trading</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {visibleNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Status */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-white">System Status</p>
                <p className="text-xs text-slate-400">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
