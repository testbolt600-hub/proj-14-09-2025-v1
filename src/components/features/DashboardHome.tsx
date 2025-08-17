import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PenTool, 
  Image, 
  RefreshCw, 
  FileText, 
  Target, 
  Calendar, 
  TrendingUp, 
  MessageCircle,
  Users,
  ArrowRight,
  Sparkles,
  BarChart3,
  Clock
} from 'lucide-react';

const DashboardHome = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Create New Post',
      description: 'Generate an optimized LinkedIn post with AI assistance',
      icon: PenTool,
      color: 'from-blue-500 to-cyan-500',
      path: '/dashboard/post-generator'
    },
    {
      title: 'Design Carousel',
      description: 'Create professional multi-slide visual content',
      icon: Image,
      color: 'from-purple-500 to-pink-500',
      path: '/dashboard/carousel-maker'
    },
    {
      title: 'View Analytics',
      description: 'Track your content performance and engagement',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      path: '/dashboard/analytics'
    },
    {
      title: 'Schedule Content',
      description: 'Plan and schedule your content calendar',
      icon: Calendar,
      color: 'from-orange-500 to-amber-500',
      path: '/dashboard/calendar'
    }
  ];

  const recentStats = [
    {
      label: 'Posts This Month',
      value: '12',
      change: '+4 from last month',
      icon: PenTool,
      positive: true
    },
    {
      label: 'Total Engagement',
      value: '2.4K',
      change: '+18% from last month',
      icon: BarChart3,
      positive: true
    },
    {
      label: 'Profile Views',
      value: '847',
      change: '+23% from last month',
      icon: TrendingUp,
      positive: true
    },
    {
      label: 'Scheduled Posts',
      value: '8',
      change: 'Next 7 days',
      icon: Clock,
      positive: null
    }
  ];

  const featuredTools = [
    {
      category: 'Job Toolkit',
      items: [
        {
          name: 'Resume Enhancer',
          description: 'Optimize your resume for ATS and recruiters',
          icon: FileText,
          path: '/dashboard/resume-enhancer'
        },
        {
          name: 'Application Tailor',
          description: 'Customize applications for specific job postings',
          icon: Target,
          path: '/dashboard/application-tailor'
        }
      ]
    },
    {
      category: 'Engagement Tools',
      items: [
        {
          name: 'Comment Helper',
          description: 'Generate strategic comments for networking',
          icon: MessageCircle,
          path: '/dashboard/comment-helper'
        },
        {
          name: 'Repurpose Content',
          description: 'Transform existing content into LinkedIn posts',
          icon: RefreshCw,
          path: '/dashboard/repurpose-content'
        }
      ]
    }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome Back!
            </h1>
            <p className="text-slate-600 mt-1">
              Ready to grow your LinkedIn presence? Let's create something amazing.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {recentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-indigo-500" />
                <span className="text-2xl font-bold text-slate-800">{stat.value}</span>
              </div>
              <div>
                <p className="text-slate-700 font-medium mb-1">{stat.label}</p>
                <p className={`text-sm ${
                  stat.positive === true ? 'text-green-500' : 
                  stat.positive === false ? 'text-red-500' : 'text-slate-500'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 hover:border-indigo-300/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{action.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{action.description}</p>
                <div className="flex items-center text-indigo-500 group-hover:text-indigo-600 transition-colors">
                  <span className="text-sm font-medium">Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredTools.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{category.category}</h3>
            <div className="space-y-4">
              {category.items.map((tool, toolIndex) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={toolIndex}
                    onClick={() => navigate(tool.path)}
                    className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-100/50 transition-colors group text-left"
                  >
                    <Icon className="w-10 h-10 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 group-hover:text-slate-900 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">{tool.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Getting Started Tips */}
      <div className="mt-8 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 rounded-2xl p-6 border border-indigo-200/50">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Pro Tip</h3>
            <p className="text-slate-600 mb-4">
              Start by creating your first LinkedIn post with our Post Generator. It analyzes your content 
              and provides optimization suggestions to maximize engagement.
            </p>
            <button
              onClick={() => navigate('/dashboard/post-generator')}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
            >
              Create Your First Post
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

