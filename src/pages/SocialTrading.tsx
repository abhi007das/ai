import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Star, TrendingUp, MessageCircle, Share } from 'lucide-react';
import Leaderboard from '../components/social/Leaderboard';
import CommunityFeed from '../components/social/CommunityFeed';
import StrategyMarketplace from '../components/social/StrategyMarketplace';
import LiveStreams from '../components/social/LiveStreams';

const SocialTrading: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard' | 'marketplace' | 'streams'>('feed');

  const tabs = [
    { id: 'feed', label: 'Community Feed', icon: MessageCircle },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'marketplace', label: 'Strategy NFTs', icon: Star },
    { id: 'streams', label: 'Live Streams', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Social Trading 2.0</h1>
          <p className="text-slate-600 mt-1">Connect, learn, and trade with the community</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Share className="w-4 h-4" />
            <span>Share Strategy</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600">
            <Users className="w-4 h-4" />
            <span>Join Community</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Traders', value: '12,847', icon: Users, color: 'blue' },
          { label: 'Strategies Shared', value: '3,492', icon: Star, color: 'purple' },
          { label: 'Total Volume', value: '$2.8B', icon: TrendingUp, color: 'green' },
          { label: 'Live Streams', value: '24', icon: MessageCircle, color: 'orange' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'feed' && <CommunityFeed />}
            {activeTab === 'leaderboard' && <Leaderboard />}
            {activeTab === 'marketplace' && <StrategyMarketplace />}
            {activeTab === 'streams' && <LiveStreams />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SocialTrading;
