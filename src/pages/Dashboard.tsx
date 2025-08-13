import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut, 
  Zap, 
  PenTool, 
  Image, 
  RefreshCw, 
  FileText, 
  Target, 
  Calendar, 
  TrendingUp, 
  MessageCircle, 
  Users,
  Menu,
  X
} from 'lucide-react';
import { signOut } from '../lib/supabase';

// Import feature components
import PostGenerator from '../components/features/PostGenerator';
import CarouselMaker from '../components/features/CarouselMaker';
import RepurposeContent from '../components/features/RepurposeContent';
import ResumeEnhancer from '../components/features/ResumeEnhancer';
import ApplicationTailor from '../components/features/ApplicationTailor';
import CalendarPostQueue from '../components/features/CalendarPostQueue';
import Analytics from '../components/features/Analytics';
import CommentHelper from '../components/features/CommentHelper';
import TeamManagement from '../components/features/TeamManagement';
import DashboardHome from '../components/features/DashboardHome';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      category: 'Create & Generate',
      items: [
        {
          name: 'Post Generator',
          path: '/dashboard/post-generator',
          icon: PenTool,
          description: 'Create optimized LinkedIn posts with AI assistance'
        },
        {
          name: 'Carousel Maker',
          path: '/dashboard/carousel-maker',
          icon: Image,
          description: 'Design professional multi-slide carousels'
        },
        {
          name: 'Repurpose Content',
          path: '/dashboard/repurpose-content',
          icon: RefreshCw,
          description: 'Transform existing content into LinkedIn posts'
        }
      ]
    },
    {
      category: 'Job Toolkit',
      items: [
        {
          name: 'Resume Enhancer',
          path: '/dashboard/resume-enhancer',
          icon: FileText,
          description: 'Optimize your resume for ATS and recruiters'
        },
        {
          name: 'Application Tailor',
          path: '/dashboard/application-tailor',
          icon: Target,
          description: 'Customize applications for specific job postings'
        }
      ]
    },
    {
      category: 'Plan & Manage',
      items: [
        {
          name: 'Calendar & Post Queue',
          path: '/dashboard/calendar',
          icon: Calendar,
          description: 'Schedule and manage your content calendar'
        }
      ]
    },
    {
      category: 'Grow & Engage',
      items: [
        {
          name: 'Analytics',
          path: '/dashboard/analytics',
          icon: TrendingUp,
          description: 'Track performance and optimize strategy'
        },
        {
          name: 'Comment Helper',
          path: '/dashboard/comment-helper',
          icon: MessageCircle,
          description: 'Generate strategic comments for engagement'
        }
      ]
    },
    {
      category: 'Account',
      items: [
        {
          name: 'Team Management & Settings',
          path: '/dashboard/team-management',
          icon: Users,
          description: 'Manage team access and account settings'
        }
      ]
    }
  ];

  const isActivePath = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#040715] flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#111827] border-r border-gray-700/50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-50">Supergrow.ai</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {section.category}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    const isActive = isActivePath(item.path);
                    
                    return (
                      <button
                        key={itemIdx}
                        onClick={() => {
                          navigate(item.path);
                          closeSidebar();
                        }}
                        className={`w-full flex items-start space-x-3 px-3 py-3 rounded-xl text-left transition-all duration-200 group ${
                          isActive
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-white'}`} />
                        <div>
                          <div className={`font-medium ${isActive ? 'text-indigo-400' : 'text-gray-300 group-hover:text-white'}`}>
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {item.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-gray-700/50">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-[#111827] border-b border-gray-700/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-300 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-md flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-50">Supergrow.ai</span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-300 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-screen bg-[#040715]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1)_0%,transparent_50%)]"></div>
          <div className="relative">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/post-generator" element={<PostGenerator />} />
              <Route path="/carousel-maker" element={<CarouselMaker />} />
              <Route path="/repurpose-content" element={<RepurposeContent />} />
              <Route path="/resume-enhancer" element={<ResumeEnhancer />} />
              <Route path="/application-tailor" element={<ApplicationTailor />} />
              <Route path="/calendar" element={<CalendarPostQueue />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/comment-helper" element={<CommentHelper />} />
              <Route path="/team-management" element={<TeamManagement />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;