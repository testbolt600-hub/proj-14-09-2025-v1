import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Star,
  PenTool,
  Image,
  FileText,
  Target,
  MessageCircle,
  RefreshCw,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Generate Post',
      description: 'Create an AI-powered LinkedIn post',
      icon: PenTool,
      path: '/dashboard/post-generator',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Create Carousel',
      description: 'Design a professional carousel',
      icon: Image,
      path: '/dashboard/carousel-maker',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Enhance Resume',
      description: 'Optimize your resume for ATS',
      icon: FileText,
      path: '/dashboard/resume-enhancer',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Schedule Content',
      description: 'Plan your content calendar',
      icon: Calendar,
      path: '/dashboard/calendar',
      color: 'from-green-500 to-teal-600'
    }
  ];

  const stats = [
    {
      title: 'Posts Generated',
      value: '24',
      change: '+12%',
      icon: PenTool,
      color: 'text-indigo-600'
    },
    {
      title: 'Profile Views',
      value: '1,247',
      change: '+23%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Engagement Rate',
      value: '8.4%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Scheduled Posts',
      value: '12',
      change: '+4',
      icon: Calendar,
      color: 'text-blue-600'
    }
  ];

  const recentActivity = [
    {
      action: 'Generated LinkedIn post',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      action: 'Created carousel template',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      action: 'Enhanced resume',
      time: '1 day ago',
      status: 'completed'
    },
    {
      action: 'Scheduled 5 posts',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back to Career Clarified
        </h1>
        <p className="text-slate-300">
          Ready to accelerate your career growth? Let's create something amazing today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-violet-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 text-left hover:bg-slate-800/80"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {action.title}
              </h3>
              <p className="text-slate-300 text-sm group-hover:text-slate-200 transition-colors">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:border-violet-400/30 hover:bg-slate-800/80"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-emerald-400 text-sm font-medium bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-slate-300 text-sm">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-violet-400/30 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-700/50 transition-colors">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-slate-400 text-sm">{activity.time}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-violet-400/30 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-6">Career Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl border border-violet-400/30 hover:border-violet-400/50 transition-all duration-300">
              <h3 className="font-semibold text-violet-300 mb-2">Post Consistently</h3>
              <p className="text-violet-200 text-sm">
                Share valuable content 3-5 times per week to build authority.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-xl border border-fuchsia-400/30 hover:border-fuchsia-400/50 transition-all duration-300">
              <h3 className="font-semibold text-fuchsia-300 mb-2">Optimize Keywords</h3>
              <p className="text-fuchsia-200 text-sm">
                Use industry keywords in your profile and posts for better visibility.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300">
              <h3 className="font-semibold text-emerald-300 mb-2">Engage Authentically</h3>
              <p className="text-emerald-200 text-sm">
                Comment meaningfully on others' posts to build relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;