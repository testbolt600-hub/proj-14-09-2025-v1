import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, Eye, BarChart3 } from 'lucide-react';

const CalendarPostQueue = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  
  const scheduledPosts = [
    {
      id: '1',
      title: '5 Tips for Remote Work Success',
      scheduledDate: '2024-01-20',
      scheduledTime: '09:00',
      status: 'scheduled',
      engagement: null
    },
    {
      id: '2', 
      title: 'The Future of AI in Business',
      scheduledDate: '2024-01-22',
      scheduledTime: '14:30',
      status: 'scheduled',
      engagement: null
    },
    {
      id: '3',
      title: 'Leadership Lessons Learned',
      scheduledDate: '2024-01-18',
      scheduledTime: '10:00',
      status: 'published',
      engagement: { likes: 45, comments: 12, shares: 8 }
    }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Calendar & Post Queue</h1>
            <p className="text-gray-400 mt-1">Schedule and manage your content calendar</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'month' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              List
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Calendar/List View */}
        <div className="lg:col-span-3">
          {viewMode === 'list' ? (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Scheduled Posts</h3>
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg border border-gray-700">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-50 mb-1">{post.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{post.scheduledDate} at {post.scheduledTime}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                          post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {post.status}
                        </span>
                        {post.engagement && (
                          <span className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            {post.engagement.likes} likes, {post.engagement.comments} comments
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="text-center py-20">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-50 mb-2">Calendar View Coming Soon</h3>
                <p className="text-gray-400">Visual calendar interface is being developed</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">This Week</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Scheduled</span>
                <span className="text-blue-400 font-semibold">8 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Published</span>
                <span className="text-green-400 font-semibold">3 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Drafts</span>
                <span className="text-yellow-400 font-semibold">5 posts</span>
              </div>
            </div>
          </div>

          {/* Optimal Times */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Best Times to Post</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Monday</span>
                <span className="text-indigo-400">9:00 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Wednesday</span>
                <span className="text-indigo-400">2:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Friday</span>
                <span className="text-indigo-400">10:30 AM</span>
              </div>
            </div>
          </div>

          {/* Content Gaps */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Content Gaps</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-sm font-medium">Tomorrow (Jan 21)</p>
                <p className="text-gray-300 text-xs mt-1">No posts scheduled</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm font-medium">Suggestion</p>
                <p className="text-gray-300 text-xs mt-1">Schedule a thought leadership post</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                Create from template
              </button>
              <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                Schedule recurring post
              </button>
              <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                Import from drafts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPostQueue;

