import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Eye, Zap, Lock, Unlock, Filter } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface StrategyNFT {
  id: string;
  name: string;
  description: string;
  creator: string;
  price: number;
  currency: 'ETH' | 'MATIC' | 'SOL';
  performance: number;
  rating: number;
  downloads: number;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  verified: boolean;
  image: string;
  isOwned: boolean;
}

const StrategyMarketplace: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'owned' | 'free' | 'premium'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'performance' | 'price' | 'newest'>('popular');

  const strategies: StrategyNFT[] = Array.from({ length: 12 }, (_, i) => ({
    id: faker.string.uuid(),
    name: [
      'Quantum Momentum Engine',
      'Neural Network Scalper',
      'DeFi Yield Harvester',
      'Volatility Crusher Pro',
      'AI Sentiment Analyzer',
      'Fibonacci Master Bot',
      'Options Flow Hunter',
      'Crypto Arbitrage King'
    ][i % 8],
    description: faker.lorem.sentences(2),
    creator: faker.person.firstName() + 'Trader',
    price: i === 0 ? 0 : faker.number.float({ min: 0.1, max: 5, fractionDigits: 2 }),
    currency: ['ETH', 'MATIC', 'SOL'][Math.floor(Math.random() * 3)] as any,
    performance: faker.number.float({ min: 10, max: 80, fractionDigits: 1 }),
    rating: faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 }),
    downloads: faker.number.int({ min: 50, max: 2000 }),
    category: ['Momentum', 'Arbitrage', 'Scalping', 'Swing', 'DeFi'][Math.floor(Math.random() * 5)],
    rarity: ['common', 'rare', 'epic', 'legendary'][Math.floor(Math.random() * 4)] as any,
    verified: Math.random() > 0.6,
    image: faker.image.url(),
    isOwned: Math.random() > 0.8
  }));

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-purple-500 to-pink-500';
      case 'epic': return 'from-blue-500 to-purple-500';
      case 'rare': return 'from-green-500 to-blue-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-purple-300 shadow-purple-100';
      case 'epic': return 'border-blue-300 shadow-blue-100';
      case 'rare': return 'border-green-300 shadow-green-100';
      default: return 'border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Strategies</option>
              <option value="owned">My Collection</option>
              <option value="free">Free Strategies</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="popular">Most Popular</option>
            <option value="performance">Best Performance</option>
            <option value="price">Price: Low to High</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600">
          Create Strategy NFT
        </button>
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-sm border-2 ${getRarityBorder(strategy.rarity)} hover:shadow-lg transition-all duration-300 overflow-hidden`}
          >
            {/* Strategy Image */}
            <div className="relative">
              <img
                src={strategy.image}
                alt={strategy.name}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${getRarityColor(strategy.rarity)}`}>
                {strategy.rarity.toUpperCase()}
              </div>
              {strategy.isOwned && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Unlock className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Strategy Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">{strategy.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">by {strategy.creator}</span>
                    {strategy.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  {strategy.price === 0 ? (
                    <span className="text-lg font-bold text-green-600">FREE</span>
                  ) : (
                    <div>
                      <span className="text-lg font-bold text-slate-900">{strategy.price}</span>
                      <span className="text-sm text-slate-600 ml-1">{strategy.currency}</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4">{strategy.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600">Performance</p>
                  <p className="font-bold text-green-600">+{strategy.performance}%</p>
                </div>
                <div className="text-center p-2 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600">Rating</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{strategy.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                <span>{strategy.category}</span>
                <span>{strategy.downloads} downloads</span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {strategy.isOwned ? (
                  <>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-green-500 text-white rounded-lg flex-1 justify-center">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                    <button className="px-3 py-2 border border-slate-300 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg flex-1 justify-center">
                      {strategy.price === 0 ? (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Get Free</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>Buy Now</span>
                        </>
                      )}
                    </button>
                    <button className="px-3 py-2 border border-slate-300 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          Load More Strategies
        </button>
      </div>
    </div>
  );
};

export default StrategyMarketplace;
