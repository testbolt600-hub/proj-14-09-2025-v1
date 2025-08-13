import React, { useState } from 'react';
import { TrendingUp, BarChart3, Users, Eye, Heart, MessageCircle, Share, Calendar } from 'lucide-react';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('30d');
  
  const metrics = {
    followers: { value: '2,847', change: '+12%', trend: 'up' },
    impressions: { value: '45.2K', change: '+8%', trend: 'up' },
    engagement: { value: '3.4%', change: '+0.7%', trend: 'up' },
    profileViews: { value: '1,234', change: '+23%', trend: 'up' }
  };

  const topPosts = [
    {
      id: '1',
      title: '5 Tips for Remote Work Success',
      date: '2024-01-18',
      likes: 145,
      comments: 23,
      shares: 12,
      impressions: 3200
    },
    {
      id: '2',
      title: 'The Future of AI in Business',
      date: '2024-01-15',
      likes: 89,
      comments: 15,
      shares: 8,
      impressions: 2100
    },
    {
      id: '3',
      title: 'Leadership Lessons from 2023',
      date: '2024-01-12',
      likes: 67,
      comments: 9,
      shares: 5,
      impressions: 1800
    }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Analytics</h1>
            <p className="text-gray-400 mt-1">Track performance and optimize strategy</p>
          </div>
        </div>
        
        <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700">
          <button
            onClick={() => setTimeframe('7d')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              timeframe === '7d' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            7 days
          </button>
          <button
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              timeframe === '30d' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            30 days
          </button>
          <button
            onClick={() => setTimeframe('90d')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              timeframe === '90d' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            90 days
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <span className={`text-sm font-medium ${
              metrics.followers.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metrics.followers.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-50 mb-1">{metrics.followers.value}</div>
          <div className="text-gray-400 text-sm">Followers</div>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-purple-400" />
            <span className={`text-sm font-medium ${
              metrics.impressions.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metrics.impressions.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-50 mb-1">{metrics.impressions.value}</div>
          <div className="text-gray-400 text-sm">Impressions</div>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-8 h-8 text-red-400" />
            <span className={`text-sm font-medium ${
              metrics.engagement.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metrics.engagement.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-50 mb-1">{metrics.engagement.value}</div>
          <div className="text-gray-400 text-sm">Engagement Rate</div>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 text-green-400" />
            <span className={`text-sm font-medium ${
              metrics.profileViews.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metrics.profileViews.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-50 mb-1">{metrics.profileViews.value}</div>
          <div className="text-gray-400 text-sm">Profile Views</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Performance Overview
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Interactive charts coming soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Posts */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Top Performing Posts</h3>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.id} className="p-4 bg-[#1F2937] rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-50 text-sm leading-tight">{post.title}</h4>
                    <span className="text-xs text-gray-400 ml-2">{post.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share className="w-3 h-3" />
                        {post.shares}
                      </span>
                    </div>
                    <span>{post.impressions.toLocaleString()} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm font-medium mb-1">Best Posting Time</p>
                <p className="text-gray-300 text-sm">Your audience is most active on Tuesdays at 2 PM</p>
              </div>
              
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm font-medium mb-1">Content Performance</p>
                <p className="text-gray-300 text-sm">Educational posts perform 40% better than promotional ones</p>
              </div>
              
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <p className="text-purple-400 text-sm font-medium mb-1">Engagement Trend</p>
                <p className="text-gray-300 text-sm">Your engagement rate increased 23% this month</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                Export analytics report
              </button>
              <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                Schedule performance review
              </button>
              <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                Set up alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

