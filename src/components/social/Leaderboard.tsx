import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Crown, Medal, Award, Users } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Trader {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  returns: number;
  winRate: number;
  followers: number;
  verified: boolean;
  badge: 'gold' | 'silver' | 'bronze' | null;
}

const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  const traders: Trader[] = Array.from({ length: 50 }, (_, i) => ({
    id: faker.string.uuid(),
    rank: i + 1,
    name: faker.person.firstName() + faker.person.lastName(),
    avatar: faker.image.avatar(),
    returns: faker.number.float({ min: -15, max: 50, fractionDigits: 2 }),
    winRate: faker.number.float({ min: 45, max: 85, fractionDigits: 1 }),
    followers: faker.number.int({ min: 100, max: 10000 }),
    verified: Math.random() > 0.7,
    badge: i < 3 ? (['gold', 'silver', 'bronze'] as const)[i] : null,
  })).sort((a, b) => b.returns - a.returns).map((trader, index) => ({ ...trader, rank: index + 1 }));

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case 'gold':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'silver':
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 'bronze':
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
    return 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-semibold text-slate-900">Top Performers</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === period
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {traders.slice(0, 3).map((trader, index) => (
          <motion.div
            key={trader.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-xl p-6 shadow-sm border-2 ${
              index === 0 ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50' :
              index === 1 ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50' :
              'border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50'
            }`}
          >
            <div className="text-center">
              <div className="relative mb-4">
                <img
                  src={trader.avatar}
                  alt={trader.name}
                  className="w-16 h-16 rounded-full mx-auto border-4 border-white shadow-lg"
                />
                <div className="absolute -top-2 -right-2">
                  {getBadgeIcon(trader.badge)}
                </div>
              </div>
              
              <h4 className="font-semibold text-slate-900 mb-1">{trader.name}</h4>
              <div className="flex items-center justify-center space-x-1 mb-3">
                <span className={`text-2xl font-bold ${
                  trader.returns >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trader.returns >= 0 ? '+' : ''}{trader.returns}%
                </span>
              </div>
              
              <div className="text-sm text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Win Rate:</span>
                  <span className="font-medium">{trader.winRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Followers:</span>
                  <span className="font-medium">{trader.followers.toLocaleString()}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-rose-600 transition-colors">
                Follow
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h4 className="font-semibold text-slate-900">Full Rankings</h4>
        </div>
        
        <div className="divide-y divide-slate-200">
          {traders.slice(3, 20).map((trader, index) => (
            <motion.div
              key={trader.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyle(trader.rank)}`}>
                  {trader.rank}
                </div>
                
                <img
                  src={trader.avatar}
                  alt={trader.name}
                  className="w-10 h-10 rounded-full"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-slate-900">{trader.name}</h5>
                    {trader.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span>Win Rate: {trader.winRate}%</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{trader.followers.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    trader.returns >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trader.returns >= 0 ? '+' : ''}{trader.returns}%
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`w-4 h-4 ${
                      trader.returns >= 0 ? 'text-green-500' : 'text-red-500'
                    }`} />
                  </div>
                </div>
                
                <button className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                  Follow
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 text-center">
          <button className="text-pink-600 hover:text-pink-700 font-medium">
            Load More Traders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
