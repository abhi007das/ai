import React from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Eye, Mic, Video, Heart } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface LiveStream {
  id: string;
  title: string;
  streamer: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  viewers: number;
  category: string;
  thumbnail: string;
  duration: string;
  isLive: boolean;
  strategy?: string;
}

const LiveStreams: React.FC = () => {
  const streams: LiveStream[] = [
    {
      id: '1',
      title: 'Live Trading Session: Scalping SPY Options',
      streamer: {
        name: 'TradeMaster Pro',
        avatar: faker.image.avatar(),
        verified: true,
        followers: 15420
      },
      viewers: 847,
      category: 'Options Trading',
      thumbnail: faker.image.url(),
      duration: '2:34:15',
      isLive: true,
      strategy: 'Momentum Scalping'
    },
    {
      id: '2',
      title: 'Building AI Trading Bot from Scratch',
      streamer: {
        name: 'CodeTrader',
        avatar: faker.image.avatar(),
        verified: true,
        followers: 8932
      },
      viewers: 523,
      category: 'Educational',
      thumbnail: faker.image.url(),
      duration: '1:45:22',
      isLive: true,
      strategy: 'Algorithm Development'
    },
    {
      id: '3',
      title: 'Crypto Market Analysis & DeFi Strategies',
      streamer: {
        name: 'CryptoQueen',
        avatar: faker.image.avatar(),
        verified: false,
        followers: 12765
      },
      viewers: 1205,
      category: 'Cryptocurrency',
      thumbnail: faker.image.url(),
      duration: '0:45:30',
      isLive: true,
      strategy: 'DeFi Yield Farming'
    },
    {
      id: '4',
      title: 'Weekly Market Recap & Next Week Preview',
      streamer: {
        name: 'MarketGuru',
        avatar: faker.image.avatar(),
        verified: true,
        followers: 25698
      },
      viewers: 0,
      category: 'Market Analysis',
      thumbnail: faker.image.url(),
      duration: '1:23:45',
      isLive: false
    }
  ];

  const categories = ['All', 'Live Trading', 'Educational', 'Market Analysis', 'Cryptocurrency', 'Options Trading'];

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="flex-shrink-0 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Live Stream */}
      {streams.filter(s => s.isLive)[0] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-1"
        >
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-red-500 uppercase">Live Now</span>
              <span className="text-sm text-slate-600">Featured Stream</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative">
                <img
                  src={streams[0].thumbnail}
                  alt={streams[0].title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                  <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors">
                    <Play className="w-8 h-8 text-slate-800 ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center space-x-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{streams[0].viewers.toLocaleString()}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{streams[0].title}</h3>
                
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={streams[0].streamer.avatar}
                    alt={streams[0].streamer.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-900">{streams[0].streamer.name}</span>
                      {streams[0].streamer.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{streams[0].streamer.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-sm text-slate-600">Category</p>
                    <p className="font-medium">{streams[0].category}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-sm text-slate-600">Strategy</p>
                    <p className="font-medium">{streams[0].strategy}</p>
                  </div>
                </div>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition-colors">
                  Join Live Stream
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stream Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-48 object-cover"
              />
              
              {stream.isLive ? (
                <div className="absolute top-3 left-3 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              ) : (
                <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {stream.duration}
                </div>
              )}
              
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                <Eye className="w-3 h-3" />
                <span>{stream.isLive ? stream.viewers.toLocaleString() : 'Replay'}</span>
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-colors flex items-center justify-center">
                <button className="w-12 h-12 bg-white bg-opacity-0 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-colors">
                  <Play className="w-6 h-6 text-white hover:text-slate-800 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-slate-900 mb-2 line-clamp-2">{stream.title}</h4>
              
              <div className="flex items-center space-x-2 mb-3">
                <img
                  src={stream.streamer.avatar}
                  alt={stream.streamer.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-slate-600">{stream.streamer.name}</span>
                {stream.streamer.verified && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{stream.category}</span>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{stream.streamer.followers.toLocaleString()}</span>
                </div>
              </div>
              
              {stream.strategy && (
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {stream.strategy}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Start Streaming CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Start Your Own Stream</h3>
          <p className="text-slate-600 mb-6">Share your trading strategies and build your following</p>
          <div className="flex items-center justify-center space-x-3">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
              <Video className="w-5 h-5" />
              <span>Go Live</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Mic className="w-5 h-5" />
              <span>Audio Only</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreams;
