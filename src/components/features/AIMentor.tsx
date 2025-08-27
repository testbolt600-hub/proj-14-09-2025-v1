import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Star,
  Award,
  Users,
  Eye,
  MessageCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Settings,
  BarChart3,
  Lightbulb,
  Clock,
  Zap,
  Trophy,
  X,
  ChevronRight,
  Play,
  Pause,
  Bell,
  BellOff
} from 'lucide-react';

interface UserProfile {
  name: string;
  careerStage: 'student' | 'early-career' | 'mid-level' | 'senior' | 'executive';
  primaryGoal: 'job-search' | 'career-growth' | 'network-building' | 'thought-leadership';
  industry: string;
  coachingFrequency: 'daily' | 'weekly' | 'monthly';
}

interface WeeklyInsight {
  id: string;
  category: 'linkedin' | 'portfolio' | 'networking' | 'content' | 'skills';
  title: string;
  description: string;
  impactScore: number;
  timeEstimate: string;
  priority: 'high' | 'medium' | 'low';
  actionSteps: string[];
  completed: boolean;
  dueDate: string;
}

interface BrandMetrics {
  linkedinViews: { current: number; change: number };
  portfolioTraffic: { current: number; change: number };
  networkGrowth: { current: number; change: number };
  contentEngagement: { current: number; change: number };
  overallScore: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'consistency' | 'growth' | 'engagement' | 'milestone';
}

const AIMentor = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John',
    careerStage: 'mid-level',
    primaryGoal: 'career-growth',
    industry: 'technology',
    coachingFrequency: 'weekly'
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'insights' | 'progress' | 'settings'>('dashboard');
  const [weeklyInsights, setWeeklyInsights] = useState<WeeklyInsight[]>([]);
  const [brandMetrics, setBrandMetrics] = useState<BrandMetrics | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<WeeklyInsight | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Initialize with mock data
  useEffect(() => {
    // Check if user has completed onboarding
    const hasOnboarded = localStorage.getItem('ai-mentor-onboarded');
    if (hasOnboarded) {
      setIsOnboarded(true);
      loadMockData();
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const loadMockData = () => {
    const mockInsights: WeeklyInsight[] = [
      {
        id: '1',
        category: 'linkedin',
        title: 'Optimize Your LinkedIn Headline',
        description: 'Your current headline could be 40% more effective. Add specific skills and value proposition.',
        impactScore: 9,
        timeEstimate: '5 minutes',
        priority: 'high',
        actionSteps: [
          'Review your current headline',
          'Add 2-3 specific skills',
          'Include your value proposition',
          'Test with A/B variations'
        ],
        completed: false,
        dueDate: '2024-01-25'
      },
      {
        id: '2',
        category: 'content',
        title: 'Share Your Recent Project Success',
        description: 'You completed a major project but haven\'t shared the story. This could generate significant engagement.',
        impactScore: 8,
        timeEstimate: '15 minutes',
        priority: 'high',
        actionSteps: [
          'Write a brief project summary',
          'Highlight key challenges overcome',
          'Include measurable results',
          'Add relevant hashtags'
        ],
        completed: false,
        dueDate: '2024-01-26'
      },
      {
        id: '3',
        category: 'networking',
        title: 'Connect with Industry Leaders',
        description: 'I found 5 professionals in your field who regularly engage with content similar to yours.',
        impactScore: 7,
        timeEstimate: '10 minutes',
        priority: 'medium',
        actionSteps: [
          'Review suggested connections',
          'Send personalized connection requests',
          'Engage with their recent content',
          'Follow up within a week'
        ],
        completed: true,
        dueDate: '2024-01-24'
      }
    ];

    const mockMetrics: BrandMetrics = {
      linkedinViews: { current: 1247, change: 23 },
      portfolioTraffic: { current: 89, change: 15 },
      networkGrowth: { current: 342, change: 8 },
      contentEngagement: { current: 4.2, change: 1.1 },
      overallScore: 78
    };

    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'First Week Complete',
        description: 'Completed your first week of AI mentoring',
        icon: '🎯',
        unlockedAt: '2024-01-21',
        category: 'milestone'
      },
      {
        id: '2',
        title: 'Action Taker',
        description: 'Completed 5 recommended actions',
        icon: '⚡',
        unlockedAt: '2024-01-20',
        category: 'consistency'
      },
      {
        id: '3',
        title: 'Network Builder',
        description: 'Grew your network by 50+ connections',
        icon: '🤝',
        unlockedAt: '2024-01-19',
        category: 'growth'
      }
    ];

    setWeeklyInsights(mockInsights);
    setBrandMetrics(mockMetrics);
    setAchievements(mockAchievements);
  };

  const completeOnboarding = () => {
    localStorage.setItem('ai-mentor-onboarded', 'true');
    setIsOnboarded(true);
    setShowOnboarding(false);
    loadMockData();
  };

  const generateMonthlyReport = async () => {
    setIsGeneratingReport(true);
    setReportProgress(0);

    const steps = [
      'Analyzing your LinkedIn activity...',
      'Reviewing portfolio performance...',
      'Comparing with industry benchmarks...',
      'Identifying growth opportunities...',
      'Generating strategic recommendations...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReportProgress(((i + 1) / steps.length) * 100);
    }

    setIsGeneratingReport(false);
    alert('Monthly report generated! Check your email for the full analysis.');
  };

  const markActionComplete = (insightId: string) => {
    setWeeklyInsights(insights => 
      insights.map(insight => 
        insight.id === insightId 
          ? { ...insight, completed: true }
          : insight
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'linkedin': return <Users className="w-5 h-5 text-blue-400" />;
      case 'portfolio': return <Eye className="w-5 h-5 text-purple-400" />;
      case 'networking': return <MessageCircle className="w-5 h-5 text-green-400" />;
      case 'content': return <Lightbulb className="w-5 h-5 text-orange-400" />;
      case 'skills': return <Target className="w-5 h-5 text-indigo-400" />;
      default: return <Brain className="w-5 h-5 text-gray-400" />;
    }
  };

  const getMetricChangeColor = (change: number) => {
    return change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-gray-400';
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">AI Mentor for Brand Growth</h1>
            <p className="text-gray-400 mt-1">Your personal AI coach for career and brand development</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              notificationsEnabled 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
            }`}
            title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
          >
            {notificationsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'insights' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Weekly Insights
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'progress' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Progress Analytics
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Mentor Settings
        </button>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-8">
              {onboardingStep === 1 && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">Meet Your AI Brand Mentor</h2>
                  <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto">
                    Your personal brand coach, available 24/7. I'll analyze your digital presence and provide 
                    personalized recommendations to accelerate your career growth.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#1F2937] rounded-lg p-4">
                      <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h3 className="font-semibold text-white mb-1">Weekly Insights</h3>
                      <p className="text-gray-400 text-sm">Personalized recommendations</p>
                    </div>
                    <div className="bg-[#1F2937] rounded-lg p-4">
                      <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h3 className="font-semibold text-white mb-1">Progress Tracking</h3>
                      <p className="text-gray-400 text-sm">Monitor your brand growth</p>
                    </div>
                    <div className="bg-[#1F2937] rounded-lg p-4">
                      <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h3 className="font-semibold text-white mb-1">Achievements</h3>
                      <p className="text-gray-400 text-sm">Celebrate your wins</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setOnboardingStep(2)}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {onboardingStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">Tell Me About Your Goals</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">What's your primary career goal?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { id: 'job-search', label: 'Find a New Job', desc: 'Looking for new opportunities' },
                          { id: 'career-growth', label: 'Advance My Career', desc: 'Promotion or skill development' },
                          { id: 'network-building', label: 'Build My Network', desc: 'Expand professional connections' },
                          { id: 'thought-leadership', label: 'Thought Leadership', desc: 'Establish industry authority' }
                        ].map((goal) => (
                          <button
                            key={goal.id}
                            onClick={() => setUserProfile({...userProfile, primaryGoal: goal.id as any})}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              userProfile.primaryGoal === goal.id
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            <h4 className="font-medium text-white mb-1">{goal.label}</h4>
                            <p className="text-gray-400 text-sm">{goal.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">What's your career stage?</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { id: 'student', label: 'Student' },
                          { id: 'early-career', label: 'Early Career' },
                          { id: 'mid-level', label: 'Mid-Level' },
                          { id: 'senior', label: 'Senior' },
                          { id: 'executive', label: 'Executive' }
                        ].map((stage) => (
                          <button
                            key={stage.id}
                            onClick={() => setUserProfile({...userProfile, careerStage: stage.id as any})}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              userProfile.careerStage === stage.id
                                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                                : 'border-gray-600 hover:border-gray-500 text-gray-300'
                            }`}
                          >
                            {stage.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">How often would you like coaching?</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: 'daily', label: 'Daily Tips', desc: 'Quick daily insights' },
                          { id: 'weekly', label: 'Weekly Reports', desc: 'Comprehensive weekly analysis' },
                          { id: 'monthly', label: 'Monthly Deep-Dives', desc: 'Strategic monthly reviews' }
                        ].map((freq) => (
                          <button
                            key={freq.id}
                            onClick={() => setUserProfile({...userProfile, coachingFrequency: freq.id as any})}
                            className={`p-4 rounded-lg border text-center transition-all ${
                              userProfile.coachingFrequency === freq.id
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            <h4 className="font-medium text-white mb-1">{freq.label}</h4>
                            <p className="text-gray-400 text-sm">{freq.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setOnboardingStep(1)}
                      className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={completeOnboarding}
                      className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Activate My AI Mentor
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && isOnboarded && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Good morning, {userProfile.name}! 👋
                  </h2>
                  <p className="text-purple-200">
                    I've analyzed your brand this week and found 3 opportunities to accelerate your growth.
                  </p>
                </div>
              </div>
            </div>

            {/* This Week's Insights */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                This Week's Priority Actions
              </h3>
              
              <div className="space-y-4">
                {weeklyInsights.filter(insight => !insight.completed).slice(0, 3).map((insight) => (
                  <div
                    key={insight.id}
                    className="bg-[#1F2937] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedInsight(insight)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(insight.category)}
                        <div>
                          <h4 className="font-semibold text-white">{insight.title}</h4>
                          <p className="text-gray-300 text-sm mt-1">{insight.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                          {insight.priority}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {insight.timeEstimate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Impact: {insight.impactScore}/10
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markActionComplete(insight.id);
                        }}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Score Overview */}
            {brandMetrics && (
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Your Brand Score This Week
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">{brandMetrics.overallScore}</div>
                    <div className="text-gray-400">Overall Brand Score</div>
                    <div className="text-green-400 text-sm mt-1">+5 points this week</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">LinkedIn Profile Views</span>
                      <div className="text-right">
                        <span className="text-white font-semibold">{brandMetrics.linkedinViews.current.toLocaleString()}</span>
                        <span className={`text-sm ml-2 ${getMetricChangeColor(brandMetrics.linkedinViews.change)}`}>
                          {brandMetrics.linkedinViews.change > 0 ? '+' : ''}{brandMetrics.linkedinViews.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Portfolio Traffic</span>
                      <div className="text-right">
                        <span className="text-white font-semibold">{brandMetrics.portfolioTraffic.current}</span>
                        <span className={`text-sm ml-2 ${getMetricChangeColor(brandMetrics.portfolioTraffic.change)}`}>
                          {brandMetrics.portfolioTraffic.change > 0 ? '+' : ''}{brandMetrics.portfolioTraffic.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Network Growth</span>
                      <div className="text-right">
                        <span className="text-white font-semibold">{brandMetrics.networkGrowth.current}</span>
                        <span className={`text-sm ml-2 ${getMetricChangeColor(brandMetrics.networkGrowth.change)}`}>
                          {brandMetrics.networkGrowth.change > 0 ? '+' : ''}{brandMetrics.networkGrowth.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Content Engagement</span>
                      <div className="text-right">
                        <span className="text-white font-semibold">{brandMetrics.contentEngagement.current}%</span>
                        <span className={`text-sm ml-2 ${getMetricChangeColor(brandMetrics.contentEngagement.change)}`}>
                          {brandMetrics.contentEngagement.change > 0 ? '+' : ''}{brandMetrics.contentEngagement.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Recent Achievements
              </h3>
              
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-[#1F2937] rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{achievement.title}</h4>
                      <p className="text-gray-400 text-xs">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Update LinkedIn profile
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Create new content
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Review portfolio
                </button>
                <button
                  onClick={generateMonthlyReport}
                  disabled={isGeneratingReport}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isGeneratingReport ? 'Generating report...' : 'Generate monthly report'}
                </button>
              </div>
            </div>

            {/* AI Mentor Status */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Mentor Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active Since</span>
                  <span className="text-indigo-400">Jan 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Actions Completed</span>
                  <span className="text-green-400">12/15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-green-400">80%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Next Analysis</span>
                  <span className="text-blue-400">Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">All Weekly Insights</h3>
              
              <div className="space-y-4">
                {weeklyInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`bg-[#1F2937] rounded-lg p-4 border transition-colors cursor-pointer ${
                      insight.completed 
                        ? 'border-green-500/30 bg-green-500/5' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedInsight(insight)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(insight.category)}
                        <div>
                          <h4 className={`font-semibold ${insight.completed ? 'text-green-400' : 'text-white'}`}>
                            {insight.title}
                            {insight.completed && <CheckCircle className="w-4 h-4 inline ml-2" />}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">{insight.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                        {insight.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Due: {insight.dueDate}</span>
                        <span>Impact: {insight.impactScore}/10</span>
                        <span>{insight.timeEstimate}</span>
                      </div>
                      {!insight.completed && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markActionComplete(insight.id);
                          }}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Completion Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">This Week</span>
                  <span className="text-green-400 font-semibold">
                    {weeklyInsights.filter(i => i.completed).length}/{weeklyInsights.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-green-400 font-semibold">80%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Streak</span>
                  <span className="text-yellow-400 font-semibold">5 weeks</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Categories</h3>
              <div className="space-y-3">
                {['linkedin', 'portfolio', 'networking', 'content', 'skills'].map((category) => {
                  const categoryInsights = weeklyInsights.filter(i => i.category === category);
                  const completedCount = categoryInsights.filter(i => i.completed).length;
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <span className="text-gray-300 capitalize">{category}</span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {completedCount}/{categoryInsights.length}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Brand Growth Analytics</h3>
              
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive progress charts coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Growth Milestones</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300 text-sm">Optimized LinkedIn headline</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300 text-sm">Published 5 thought leadership posts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300 text-sm">Build portfolio website</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300 text-sm">Reach 1000 LinkedIn connections</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Monthly Report</h3>
              <div className="text-center">
                <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">Your next monthly strategic review is scheduled for February 1st</p>
                <button
                  onClick={generateMonthlyReport}
                  disabled={isGeneratingReport}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isGeneratingReport ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating... {Math.round(reportProgress)}%
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Early Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-50 mb-8">AI Mentor Settings</h3>
            
            <div className="space-y-8">
              {/* Coaching Preferences */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Coaching Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'daily', label: 'Daily Tips', desc: 'Quick daily insights' },
                    { id: 'weekly', label: 'Weekly Reports', desc: 'Comprehensive weekly analysis' },
                    { id: 'monthly', label: 'Monthly Deep-Dives', desc: 'Strategic monthly reviews' }
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setUserProfile({...userProfile, coachingFrequency: freq.id as any})}
                      className={`p-4 rounded-lg border text-center transition-all ${
                        userProfile.coachingFrequency === freq.id
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <h5 className="font-medium text-white mb-1">{freq.label}</h5>
                      <p className="text-gray-400 text-sm">{freq.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Career Goals */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Primary Career Goal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'job-search', label: 'Find a New Job', desc: 'Looking for new opportunities' },
                    { id: 'career-growth', label: 'Advance My Career', desc: 'Promotion or skill development' },
                    { id: 'network-building', label: 'Build My Network', desc: 'Expand professional connections' },
                    { id: 'thought-leadership', label: 'Thought Leadership', desc: 'Establish industry authority' }
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setUserProfile({...userProfile, primaryGoal: goal.id as any})}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        userProfile.primaryGoal === goal.id
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <h5 className="font-medium text-white mb-1">{goal.label}</h5>
                      <p className="text-gray-400 text-sm">{goal.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                    <div>
                      <h5 className="font-medium text-white">Weekly Insights</h5>
                      <p className="text-gray-400 text-sm">Get notified when new insights are ready</p>
                    </div>
                    <button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                    <div>
                      <h5 className="font-medium text-white">Achievement Alerts</h5>
                      <p className="text-gray-400 text-sm">Celebrate when you unlock new achievements</p>
                    </div>
                    <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-indigo-600">
                      <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insight Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                {getCategoryIcon(selectedInsight.category)}
                <h3 className="text-xl font-semibold text-white">{selectedInsight.title}</h3>
              </div>
              <button
                onClick={() => setSelectedInsight(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedInsight.priority)}`}>
                    {selectedInsight.priority} priority
                  </span>
                  <span className="text-gray-400">Impact Score: {selectedInsight.impactScore}/10</span>
                  <span className="text-gray-400">Time: {selectedInsight.timeEstimate}</span>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Why This Matters</h4>
                  <p className="text-gray-300">{selectedInsight.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Action Steps</h4>
                  <div className="space-y-2">
                    {selectedInsight.actionSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#1F2937] rounded-lg">
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {!selectedInsight.completed ? (
                    <button
                      onClick={() => {
                        markActionComplete(selectedInsight.id);
                        setSelectedInsight(null);
                      }}
                      className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Mark as Complete
                    </button>
                  ) : (
                    <div className="flex-1 px-4 py-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg font-medium text-center">
                      ✓ Completed
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedInsight(null)}
                    className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Report Generation Modal */}
      {isGeneratingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-md p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Generating Your Monthly Report</h3>
            <p className="text-gray-300 mb-6">AI Mentor is analyzing your brand growth...</p>
            
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${reportProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm">{Math.round(reportProgress)}% complete</p>
          </div>
        </div>
      )}

      {/* Empty State for Non-Onboarded Users */}
      {!isOnboarded && !showOnboarding && (
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#111827] rounded-2xl p-12 border border-gray-700/50">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Brain className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Activate Your AI Brand Mentor</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Get personalized coaching, weekly insights, and strategic recommendations to accelerate your career growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1F2937] rounded-lg p-6">
                <Lightbulb className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Weekly Insights</h3>
                <p className="text-gray-400 text-sm">Personalized recommendations based on your goals and industry</p>
              </div>
              
              <div className="bg-[#1F2937] rounded-lg p-6">
                <TrendingUp className="w-10 h-10 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Progress Tracking</h3>
                <p className="text-gray-400 text-sm">Monitor your brand growth with detailed analytics and trends</p>
              </div>
              
              <div className="bg-[#1F2937] rounded-lg p-6">
                <Award className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Achievement System</h3>
                <p className="text-gray-400 text-sm">Unlock badges and celebrate milestones as you grow</p>
              </div>
            </div>

            <button
              onClick={() => setShowOnboarding(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Activate AI Mentor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMentor;