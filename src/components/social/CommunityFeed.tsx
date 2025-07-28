import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, TrendingUp, Play, Image, PlusCircle } from 'lucide-react';
import { faker } from '@faker-js/faker';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  content: string;
  symbol?: string;
  performance?: number;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const postTypes = [
      'Just closed my $AAPL position for a solid +12.5% gain! The AI momentum strategy nailed this breakout perfectly. Who else is riding this wave? 🚀',
      'New strategy alert! My genetic algorithm just found an incredible pattern in $TSLA options. Backtesting shows 78% win rate over 6 months. Thoughts?',
      'Live streaming my trading session in 10 minutes! Going to demonstrate the new DeFi arbitrage bot. Come ask questions! 💡',
      'Market sentiment analysis suggests we might see a correction in tech stocks next week. Anyone else seeing similar signals?',
      'Huge shoutout to @TraderPro for sharing that mean reversion strategy. Already up 8% this week using it! 🙏'
    ];

    return Array.from({ length: 15 }, (_, i) => ({
      id: faker.string.uuid(),
      author: {
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        avatar: faker.image.avatar(),
        verified: Math.random() > 0.7,
        followers: faker.number.int({ min: 500, max: 50000 })
      },
      content: postTypes[Math.floor(Math.random() * postTypes.length)],
      symbol: Math.random() > 0.5 ? ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN'][Math.floor(Math.random() * 5)] : undefined,
      performance: Math.random() > 0.6 ? faker.number.float({ min: -5, max: 25, fractionDigits: 1 }) : undefined,
      media: Math.random() > 0.7 ? {
        type: Math.random() > 0.5 ? 'video' : 'image',
        url: faker.image.url(),
        thumbnail: faker.image.url()
      } : undefined,
      likes: faker.number.int({ min: 5, max: 500 }),
      comments: faker.number.int({ min: 0, max: 50 }),
      shares: faker.number.int({ min: 0, max: 25 }),
      timestamp: faker.date.recent().toISOString(),
      liked: Math.random() > 0.7
    }));
  });

  const [newPost, setNewPost] = useState('');

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now.getTime() - postTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-start space-x-4">
          <img
            src={faker.image.avatar()}
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your trading insights..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-1 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                  <Image className="w-4 h-4" />
                  <span>Photo</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                  <Play className="w-4 h-4" />
                  <span>Video</span>
                </button>
              </div>
              <button 
                disabled={!newPost.trim()}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg disabled:opacity-50 hover:from-pink-600 hover:to-rose-600 transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-slate-900">{post.author.name}</h4>
                    {post.author.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    )}
                    {post.symbol && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        ${post.symbol}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">
                    {post.author.followers.toLocaleString()} followers • {getTimeAgo(post.timestamp)}
                  </p>
                </div>
              </div>
              
              <button className="p-2 hover:bg-slate-100 rounded-full">
                <PlusCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-slate-800 leading-relaxed">{post.content}</p>
              
              {post.performance && (
                <div className="mt-3 inline-flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Performance: +{post.performance}%
                  </span>
                </div>
              )}
            </div>

            {/* Media */}
            {post.media && (
              <div className="mb-4">
                {post.media.type === 'image' ? (
                  <img
                    src={post.media.url}
                    alt="Post media"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="relative">
                    <img
                      src={post.media.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.liked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-slate-500 hover:text-green-500 transition-colors">
                  <Share className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.shares}</span>
                </button>
              </div>
              
              <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                Follow Strategy
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default CommunityFeed;
