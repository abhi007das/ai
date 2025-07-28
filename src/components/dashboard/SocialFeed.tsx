import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Share, TrendingUp, User } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface SocialPost {
  id: string;
  user: string;
  avatar: string;
  content: string;
  symbol?: string;
  likes: number;
  comments: number;
  timestamp: string;
  performance?: number;
}

const SocialFeed: React.FC = () => {
  const posts: SocialPost[] = [
    {
      id: '1',
      user: 'TraderMike87',
      avatar: '👨‍💼',
      content: 'Just closed my AAPL position for +8.5% gain. AI strategy nailed the breakout perfectly!',
      symbol: 'AAPL',
      likes: 24,
      comments: 8,
      timestamp: '2m ago',
      performance: 8.5
    },
    {
      id: '2',
      user: 'QuantQueen',
      avatar: '👩‍💻',
      content: 'New genetic algorithm showing promising backtest results. 73% win rate over 6 months.',
      likes: 45,
      comments: 15,
      timestamp: '15m ago'
    },
    {
      id: '3',
      user: 'CryptoKing',
      avatar: '🤴',
      content: 'DeFi arbitrage opportunity detected between Uniswap and Sushiswap. Anyone else seeing this?',
      likes: 18,
      comments: 6,
      timestamp: '32m ago'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Social Trading</h3>
          <p className="text-sm text-slate-600">Community insights</p>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {post.avatar}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-slate-900">{post.user}</span>
                  <span className="text-xs text-slate-500">{post.timestamp}</span>
                  {post.symbol && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {post.symbol}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-slate-700 mb-3">{post.content}</p>
                
                {post.performance && (
                  <div className="flex items-center space-x-1 mb-3 p-2 bg-green-50 rounded">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      +{post.performance}% Performance
                    </span>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-slate-500">
                  <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-rose-600 transition-colors">
        Join Community
      </button>
    </motion.div>
  );
};

export default SocialFeed;
