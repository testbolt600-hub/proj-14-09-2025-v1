import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LogOut,
  PenTool, 
  Image, 
  RefreshCw, 
  FileText, 
  Target, 
  Calendar, 
  TrendingUp, 
  MessageCircle, 
  Users,
  FolderOpen,
  Menu,
  X,
  Home,
  Brain,
  Globe
} from 'lucide-react';
import { signOut } from '../lib/supabase';
import Logo from '../components/Logo';

// Import feature components
import PostGenerator from '../components/features/PostGenerator';
import CarouselMaker from '../components/features/CarouselMaker';
import RepurposeContent from '../components/features/RepurposeContent';
import SmartResumeStudio from '../components/features/SmartResumeStudio';
import ApplicationTailor from '../components/features/ApplicationTailor';
import CoverLetterGenerator from '../components/features/CoverLetterGenerator';
import ResumeManager from '../components/features/ResumeManager';
import CalendarPostQueue from '../components/features/CalendarPostQueue';
import Analytics from '../components/features/Analytics';
import CommentHelper from '../components/features/CommentHelper';
import TeamManagement from '../components/features/TeamManagement';
import DashboardHome from '../components/features/DashboardHome';
import BrandAudit from '../components/features/BrandAudit';
import JobFinder from '../components/features/JobFinder';
import JobTracker from '../components/features/JobTracker';
import InterviewPrepKit from '../components/features/InterviewPrepKit';
import ContentEngine from '../components/features/ContentEngine';
import CareerPortfolio from '../components/features/CareerPortfolio';
import AIMentor from '../components/features/AIMentor';
import CareerEventScout from '../components/features/CareerEventScout';
import ReputationMonitor from '../components/features/ReputationMonitor';

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
      category: 'Overview',
      items: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: Home,
        }
      ]
    },
    {
      category: 'Create & Generate',
      items: [
        {
          name: 'Post Generator',
          path: '/dashboard/post-generator',
          icon: PenTool,
        },
        {
          name: 'Carousel Maker',
          path: '/dashboard/carousel-maker',
          icon: Image,
        },
        {
          name: 'Repurpose Content',
          path: '/dashboard/repurpose-content',
          icon: RefreshCw,
        },
        {
          name: 'AI-Powered Personal Brand Audit',
          path: '/dashboard/brand-audit',
          icon: TrendingUp,
          description: 'Comprehensive analysis of your digital brand presence'
        },
        {
          name: 'Content Engine for Thought Leadership',
          path: '/dashboard/content-engine',
          icon: Brain,
          description: 'AI-powered thought leadership content generation'
        },
        {
          name: 'AI-Generated Career Portfolio/Microsite',
          path: '/dashboard/career-portfolio',
          icon: Globe,
          description: 'Create professional portfolio websites with AI'
        },
        {
          name: 'AI Mentor for Brand Growth',
          path: '/dashboard/ai-mentor',
          icon: Brain,
          description: 'Personal AI coach for career and brand development'
        },
        {
          name: 'Reputation Monitoring & Personal SEO',
          path: '/dashboard/reputation-monitor',
          icon: Shield,
          description: 'Monitor your online presence and optimize your digital brand'
        },
        {
          name: 'AI Career Event Scout & Networking Assistant',
          path: '/dashboard/career-event-scout',
          icon: Users,
          description: 'Discover events, track role models, and build meaningful connections'
        }
      ]
    },
    {
      category: 'Career Hub',
      items: [
        {
          name: 'Smart Resume Studio',
          path: '/dashboard/smart-resume-studio',
          icon: FileText,
          description: 'AI-powered resume creation and optimization'
        },
        {
          name: 'Application Tailor',
          path: '/dashboard/application-tailor',
          icon: Target,
          description: 'Tailor resumes for specific job applications'
        },
        {
          name: 'Cover Letter Generator',
          path: '/dashboard/cover-letter-generator',
          icon: FileText,
          description: 'AI-powered personalized cover letters'
        },
        {
          name: 'Job Finder',
          path: '/dashboard/job-finder',
          icon: Target,
          description: 'AI-powered job search and scoring'
        },
        {
          name: 'Job Tracker',
          path: '/dashboard/job-tracker',
          icon: FolderOpen,
          description: 'Kanban board for application pipeline'
        },
        {
          name: 'Interview Prep Kit',
          path: '/dashboard/interview-prep',
          icon: Users,
          description: 'AI-powered interview preparation'
        },
        {
          name: 'Work History Manager',
          path: '/dashboard/work-history-manager',
          icon: FolderOpen,
          description: 'Manage saved resumes, cover letters, and documents'
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
        },
        {
          name: 'Comment Helper',
          path: '/dashboard/comment-helper',
          icon: MessageCircle,
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
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <Logo />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
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
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`} />
                        <div>
                          <div className={`font-medium ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                            {item.name}
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
          <div className="p-4 border-t border-slate-800">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
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
        <header className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-400 hover:text-slate-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Logo size="sm" />
            <button
              onClick={handleSignOut}
              className="text-slate-400 hover:text-slate-300"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-screen bg-slate-950">
          <div className="relative">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/post-generator" element={<PostGenerator />} />
              <Route path="/carousel-maker" element={<CarouselMaker />} />
              <Route path="/repurpose-content" element={<RepurposeContent />} />
              <Route path="/brand-audit" element={<BrandAudit />} />
              <Route path="/content-engine" element={<ContentEngine />} />
              <Route path="/career-portfolio" element={<CareerPortfolio />} />
              <Route path="/job-finder" element={<JobFinder />} />
              <Route path="/job-tracker" element={<JobTracker />} />
              <Route path="/interview-prep" element={<InterviewPrepKit />} />
              <Route path="/smart-resume-studio" element={<SmartResumeStudio />} />
              <Route path="/application-tailor" element={<ApplicationTailor />} />
              <Route path="/cover-letter-generator" element={<CoverLetterGenerator />} />
              <Route path="/work-history-manager" element={<ResumeManager />} />
              <Route path="/calendar" element={<CalendarPostQueue />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/comment-helper" element={<CommentHelper />} />
              <Route path="/team-management" element={<TeamManagement />} />
              <Route path="/ai-mentor" element={<AIMentor />} />
              <Route path="/reputation-monitor" element={<ReputationMonitor />} />
              <Route path="/career-event-scout" element={<CareerEventScout />} />
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