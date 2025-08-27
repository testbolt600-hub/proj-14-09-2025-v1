import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Calendar, 
  Star,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  MessageCircle,
  BarChart3,
  User,
  Award,
  Clock,
  Lightbulb,
  ArrowRight,
  Download,
  Settings,
  Bell,
  Zap,
  Trophy,
  Sparkles,
  BookOpen,
  LineChart,
  Users,
  Globe,
  Shield,
  Heart,
  Coffee,
  Rocket
} from 'lucide-react';

interface BrandScore {
  overall: number;
  visibility: number;
  engagement: number;
  professionalPresence: number;
  networkQuality: number;
}

interface MentorInsight {
  id: string;
  type: 'weekly' | 'monthly' | 'milestone' | 'achievement';
  title: string;
  content: string;
  actionItems: ActionItem[];
  priorityScore: number;
  estimatedImpact: string;
  generatedAt: string;
  isRead: boolean;
  feedback?: {
    rating: number;
    completed: boolean;
  };
}

interface ActionItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  category: string;
  completed: boolean;
}

interface UserGoal {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  deadline: string;
  category: string;
  progress: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
  category: string;
  icon: string;
}

const AIMentor = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'insights' | 'goals' | 'progress' | 'achievements'>('dashboard');
  const [brandScore, setBrandScore] = useState<BrandScore | null>(null);
  const [insights, setInsights] = useState<MentorInsight[]>([]);
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<MentorInsight | null>(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetValue: 0,
    deadline: '',
    category: 'visibility'
  });

  // Mock data initialization
  useEffect(() => {
    const mockBrandScore: BrandScore = {
      overall: 78,
      visibility: 82,
      engagement: 74,
      professionalPresence: 85,
      networkQuality: 71
    };

    const mockInsights: MentorInsight[] = [
      {
        id: '1',
        type: 'weekly',
        title: 'Your LinkedIn Engagement is Trending Up! 📈',
        content: 'Great progress this week! Your engagement rate increased by 15% compared to last week. Your recent post about AI in software development resonated particularly well with your network. Consider sharing more technical insights to build on this momentum.',
        actionItems: [
          {
            id: '1',
            title: 'Share a technical case study',
            description: 'Write about a recent project challenge and how you solved it',
            difficulty: 'medium',
            estimatedTime: '20 minutes',
            category: 'content',
            completed: false
          }
        ],
        priorityScore: 4,
        estimatedImpact: '+12% engagement',
        generatedAt: '2024-01-21T10:00:00Z',
        isRead: false
      },
      {
        id: '2',
        type: 'monthly',
        title: 'Monthly Brand Review: Strong Foundation Building',
        content: 'This month you\'ve made significant strides in establishing your professional presence. Your profile completeness improved by 25%, and you\'ve consistently shared valuable content. Focus areas for next month: expanding your network strategically and engaging more with industry leaders.',
        actionItems: [
          {
            id: '2',
            title: 'Connect with 10 industry leaders',
            description: 'Identify and connect with thought leaders in your field',
            difficulty: 'easy',
            estimatedTime: '30 minutes',
            category: 'networking',
            completed: false
          },
          {
            id: '3',
            title: 'Comment on 5 industry posts weekly',
            description: 'Engage meaningfully with content from industry leaders',
            difficulty: 'easy',
            estimatedTime: '15 minutes daily',
            category: 'engagement',
            completed: true
          }
        ],
        priorityScore: 5,
        estimatedImpact: '+20% visibility',
        generatedAt: '2024-01-20T09:00:00Z',
        isRead: true,
        feedback: {
          rating: 5,
          completed: true
        }
      },
      {
        id: '3',
        type: 'achievement',
        title: 'Milestone Unlocked: Consistent Creator! 🎉',
        content: 'Congratulations! You\'ve posted consistently for 4 weeks straight. This consistency is building real momentum in your personal brand. Your audience is starting to recognize you as a reliable source of insights.',
        actionItems: [],
        priorityScore: 3,
        estimatedImpact: 'Brand recognition boost',
        generatedAt: '2024-01-19T14:30:00Z',
        isRead: true
      }
    ];

    const mockGoals: UserGoal[] = [
      {
        id: '1',
        title: 'Reach 5,000 LinkedIn connections',
        targetValue: 5000,
        currentValue: 3247,
        deadline: '2024-06-01',
        category: 'networking',
        progress: 65
      },
      {
        id: '2',
        title: 'Achieve 5% average engagement rate',
        targetValue: 5,
        currentValue: 3.4,
        deadline: '2024-04-01',
        category: 'engagement',
        progress: 68
      },
      {
        id: '3',
        title: 'Publish 50 thought leadership posts',
        targetValue: 50,
        currentValue: 32,
        deadline: '2024-12-31',
        category: 'content',
        progress: 64
      }
    ];

    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'First Post Published',
        description: 'Published your first LinkedIn post',
        unlockedAt: '2024-01-01',
        category: 'content',
        icon: '🎯'
      },
      {
        id: '2',
        title: 'Consistent Creator',
        description: 'Posted consistently for 4 weeks',
        unlockedAt: '2024-01-19',
        category: 'consistency',
        icon: '🔥'
      },
      {
        id: '3',
        title: 'Engagement Master',
        description: 'Achieved 5%+ engagement rate',
        unlockedAt: '2024-01-15',
        category: 'engagement',
        icon: '⚡'
      },
      {
        id: '4',
        title: 'Network Builder',
        description: 'Reached 3,000 connections',
        unlockedAt: '2024-01-10',
        category: 'networking',
        icon: '🌐'
      }
    ];

    setBrandScore(mockBrandScore);
    setInsights(mockInsights);
    setGoals(mockGoals);
    setAchievements(mockAchievements);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return 'text-red-400 bg-red-500/20';
    if (priority >= 3) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'weekly': return <Calendar className="w-5 h-5 text-blue-400" />;
      case 'monthly': return <BarChart3 className="w-5 h-5 text-purple-400" />;
      case 'milestone': return <Target className="w-5 h-5 text-green-400" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-400" />;
      default: return <Lightbulb className="w-5 h-5 text-indigo-400" />;
    }
  };

  const markInsightAsRead = (insightId: string) => {
    setInsights(insights.map(insight => 
      insight.id === insightId ? { ...insight, isRead: true } : insight
    ));
  };

  const completeActionItem = (insightId: string, actionId: string) => {
    setInsights(insights.map(insight => 
      insight.id === insightId 
        ? {
            ...insight,
            actionItems: insight.actionItems.map(action =>
              action.id === actionId ? { ...action, completed: true } : action
            )
          }
        : insight
    ));
  };

  const addGoal = () => {
    if (!newGoal.title.trim()) return;
    
    const goal: UserGoal = {
      id: Date.now().toString(),
      title: newGoal.title,
      targetValue: newGoal.targetValue,
      currentValue: 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      progress: 0
    };
    
    setGoals([...goals, goal]);
    setNewGoal({ title: '', targetValue: 0, deadline: '', category: 'visibility' });
    setShowGoalModal(false);
  };

  const refreshInsights = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
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
            <h1 className="text-3xl font-bold text-gray-50">AI Mentor for Personal Brand Growth</h1>
            <p className="text-gray-400 mt-1">Your personal AI coach for career and brand development</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={refreshInsights}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Insights
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'insights' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          AI Insights
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'goals' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Goals & Progress
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'progress' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Progress Tracking
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'achievements' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Achievements
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Brand Score Overview */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Your Brand Score
              </h3>
              
              {brandScore && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-4 ${getScoreColor(brandScore.overall)}`}>
                      {brandScore.overall}
                    </div>
                    <div className="text-gray-400 mb-2">Overall Brand Score</div>
                    <div className={`w-full h-3 bg-gray-700 rounded-full overflow-hidden`}>
                      <div 
                        className={`h-full bg-gradient-to-r ${getScoreGradient(brandScore.overall)} transition-all duration-1000`}
                        style={{ width: `${brandScore.overall}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Visibility</span>
                      <span className={`font-semibold ${getScoreColor(brandScore.visibility)}`}>
                        {brandScore.visibility}/100
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Engagement</span>
                      <span className={`font-semibold ${getScoreColor(brandScore.engagement)}`}>
                        {brandScore.engagement}/100
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Professional Presence</span>
                      <span className={`font-semibold ${getScoreColor(brandScore.professionalPresence)}`}>
                        {brandScore.professionalPresence}/100
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Network Quality</span>
                      <span className={`font-semibold ${getScoreColor(brandScore.networkQuality)}`}>
                        {brandScore.networkQuality}/100
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Insights */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-400" />
                  Recent AI Insights
                </h3>
                <button
                  onClick={() => setActiveTab('insights')}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {insights.slice(0, 3).map((insight) => (
                  <div
                    key={insight.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:border-gray-600 ${
                      insight.isRead ? 'border-gray-700 bg-[#1F2937]' : 'border-blue-500/30 bg-blue-500/5'
                    }`}
                    onClick={() => {
                      setSelectedInsight(insight);
                      markInsightAsRead(insight.id);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-50">{insight.title}</h4>
                          {!insight.isRead && (
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-2">{insight.content}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span className={`px-2 py-1 rounded-full ${getPriorityColor(insight.priorityScore)}`}>
                            Priority {insight.priorityScore}/5
                          </span>
                          <span>{insight.estimatedImpact}</span>
                          <span>{new Date(insight.generatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals Progress */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Goal Progress
                </h3>
                <button
                  onClick={() => setActiveTab('goals')}
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
                >
                  Manage Goals <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {goals.slice(0, 3).map((goal) => (
                  <div key={goal.id} className="bg-[#1F2937] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-50">{goal.title}</h4>
                      <span className="text-indigo-400 font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{goal.currentValue.toLocaleString()} / {goal.targetValue.toLocaleString()}</span>
                      <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Mentor Status */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Mentor Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">Active & Learning</span>
                </div>
                
                <div className="text-sm text-gray-300">
                  <p className="mb-2">Your AI mentor is continuously analyzing your brand growth and generating personalized insights.</p>
                  <div className="space-y-1">
                    <div>• Last analysis: 2 hours ago</div>
                    <div>• Next insight: Tomorrow at 9 AM</div>
                    <div>• Learning from: 847 data points</div>
                  </div>
                </div>
              </div>
            </div>

            {/* This Week's Focus */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                This Week's Focus
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">Content Strategy</h4>
                  <p className="text-gray-300 text-sm">Share 2 technical insights to boost engagement</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium text-sm mb-1">Network Growth</h4>
                  <p className="text-gray-300 text-sm">Connect with 5 industry leaders</p>
                </div>
                
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="text-purple-400 font-medium text-sm mb-1">Engagement</h4>
                  <p className="text-gray-300 text-sm">Comment meaningfully on 10 posts</p>
                </div>
              </div>
            </div>

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
                      <h4 className="font-medium text-gray-50 text-sm">{achievement.title}</h4>
                      <p className="text-gray-400 text-xs">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setActiveTab('achievements')}
                className="w-full mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center justify-center gap-1"
              >
                View All Achievements <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Days Active</span>
                  <span className="text-indigo-400 font-semibold">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Insights Received</span>
                  <span className="text-purple-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Actions Completed</span>
                  <span className="text-green-400 font-semibold">8/15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Brand Growth</span>
                  <span className="text-yellow-400 font-semibold">+12 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Tab */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">All AI Insights</h3>
              
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`p-6 rounded-lg border cursor-pointer transition-all hover:border-gray-600 ${
                      insight.isRead ? 'border-gray-700 bg-[#1F2937]' : 'border-blue-500/30 bg-blue-500/5'
                    }`}
                    onClick={() => {
                      setSelectedInsight(insight);
                      markInsightAsRead(insight.id);
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <h4 className="font-semibold text-gray-50">{insight.title}</h4>
                          {!insight.isRead && (
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{insight.content}</p>
                        
                        {insight.actionItems.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-gray-50">Action Items:</h5>
                            {insight.actionItems.map((action) => (
                              <div key={action.id} className="flex items-center gap-3 p-3 bg-[#111827] rounded-lg">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    completeActionItem(insight.id, action.id);
                                  }}
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    action.completed 
                                      ? 'border-green-400 bg-green-400' 
                                      : 'border-gray-500 hover:border-green-400'
                                  }`}
                                >
                                  {action.completed && <CheckCircle className="w-3 h-3 text-white" />}
                                </button>
                                <div className="flex-1">
                                  <h6 className={`font-medium text-sm ${action.completed ? 'text-gray-400 line-through' : 'text-gray-50'}`}>
                                    {action.title}
                                  </h6>
                                  <p className="text-gray-400 text-xs">{action.description}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(action.difficulty)}`}>
                                      {action.difficulty}
                                    </span>
                                    <span className="text-gray-500 text-xs">{action.estimatedTime}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                          <span className={`px-2 py-1 rounded-full ${getPriorityColor(insight.priorityScore)}`}>
                            Priority {insight.priorityScore}/5
                          </span>
                          <span>Impact: {insight.estimatedImpact}</span>
                          <span>{new Date(insight.generatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Insight Categories</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Weekly Updates</span>
                  <span className="text-blue-400 font-semibold">
                    {insights.filter(i => i.type === 'weekly').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monthly Reviews</span>
                  <span className="text-purple-400 font-semibold">
                    {insights.filter(i => i.type === 'monthly').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Achievements</span>
                  <span className="text-yellow-400 font-semibold">
                    {insights.filter(i => i.type === 'achievement').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Milestones</span>
                  <span className="text-green-400 font-semibold">
                    {insights.filter(i => i.type === 'milestone').length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Learning Progress</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">847</div>
                  <div className="text-gray-400 text-sm">Data Points Analyzed</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Profile Analysis</span>
                    <span className="text-green-400">Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Behavior Patterns</span>
                    <span className="text-green-400">Learning</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Industry Benchmarks</span>
                    <span className="text-blue-400">Updated</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Personalization</span>
                    <span className="text-purple-400">Optimizing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50">Your Brand Goals</h3>
                <button
                  onClick={() => setShowGoalModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Target className="w-4 h-4" />
                  Add Goal
                </button>
              </div>
              
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-50 text-lg">{goal.title}</h4>
                      <span className={`text-2xl font-bold ${getScoreColor(goal.progress)}`}>
                        {goal.progress}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Current:</span>
                        <p className="text-white font-semibold">{goal.currentValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Target:</span>
                        <p className="text-white font-semibold">{goal.targetValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Deadline:</span>
                        <p className="text-white font-semibold">{new Date(goal.deadline).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Goal Categories</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Visibility</span>
                  <span className="text-blue-400 font-semibold">
                    {goals.filter(g => g.category === 'visibility').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Engagement</span>
                  <span className="text-green-400 font-semibold">
                    {goals.filter(g => g.category === 'engagement').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Networking</span>
                  <span className="text-purple-400 font-semibold">
                    {goals.filter(g => g.category === 'networking').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Content</span>
                  <span className="text-orange-400 font-semibold">
                    {goals.filter(g => g.category === 'content').length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">Suggested Goal</h4>
                  <p className="text-gray-300 text-sm">Increase post frequency to 3x per week</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium text-sm mb-1">Quick Win</h4>
                  <p className="text-gray-300 text-sm">Update LinkedIn headline for better visibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Tracking Tab */}
      {activeTab === 'progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Brand Growth Timeline</h3>
              
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                <div className="text-center">
                  <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive progress charts coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Progress Summary</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">+12</div>
                  <div className="text-gray-400 text-sm">Points This Month</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Best Week</span>
                    <span className="text-green-400">+8 points</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Consistency</span>
                    <span className="text-blue-400">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Trend</span>
                    <span className="text-green-400">↗ Improving</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Milestones</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-50 text-sm font-medium">Reached 3,000 connections</p>
                    <p className="text-gray-400 text-xs">Jan 15, 2024</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-50 text-sm font-medium">4 weeks consistent posting</p>
                    <p className="text-gray-400 text-xs">Jan 19, 2024</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-gray-400 text-sm">Next: 5% engagement rate</p>
                    <p className="text-gray-500 text-xs">68% progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Your Achievements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="font-semibold text-gray-50 mb-2">{achievement.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                      <div className="text-xs text-gray-500">
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Achievement Stats</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">{achievements.length}</div>
                  <div className="text-gray-400 text-sm">Total Achievements</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Content</span>
                    <span className="text-blue-400">{achievements.filter(a => a.category === 'content').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Engagement</span>
                    <span className="text-green-400">{achievements.filter(a => a.category === 'engagement').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Networking</span>
                    <span className="text-purple-400">{achievements.filter(a => a.category === 'networking').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Consistency</span>
                    <span className="text-orange-400">{achievements.filter(a => a.category === 'consistency').length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Next Achievements</h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h4 className="text-yellow-400 font-medium text-sm mb-1">🎯 Almost There!</h4>
                  <p className="text-gray-300 text-sm">5% engagement rate (68% progress)</p>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">🌟 Coming Soon</h4>
                  <p className="text-gray-300 text-sm">Thought leader status (45% progress)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Add New Goal</h3>
              <button
                onClick={() => setShowGoalModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="e.g., Reach 10,000 profile views"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Value</label>
                <input
                  type="number"
                  value={newGoal.targetValue}
                  onChange={(e) => setNewGoal({...newGoal, targetValue: Number(e.target.value)})}
                  placeholder="10000"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                >
                  <option value="visibility">Visibility</option>
                  <option value="engagement">Engagement</option>
                  <option value="networking">Networking</option>
                  <option value="content">Content</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addGoal}
                  disabled={!newGoal.title.trim() || !newGoal.targetValue || !newGoal.deadline}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Add Goal
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
                {getInsightIcon(selectedInsight.type)}
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
                <div>
                  <h4 className="font-semibold text-white mb-3">Insight Details</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedInsight.content}</p>
                </div>

                {selectedInsight.actionItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-3">Action Items</h4>
                    <div className="space-y-3">
                      {selectedInsight.actionItems.map((action) => (
                        <div key={action.id} className="flex items-start gap-3 p-4 bg-[#1F2937] rounded-lg">
                          <button
                            onClick={() => completeActionItem(selectedInsight.id, action.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              action.completed 
                                ? 'border-green-400 bg-green-400' 
                                : 'border-gray-500 hover:border-green-400'
                            }`}
                          >
                            {action.completed && <CheckCircle className="w-4 h-4 text-white" />}
                          </button>
                          <div className="flex-1">
                            <h5 className={`font-medium ${action.completed ? 'text-gray-400 line-through' : 'text-gray-50'}`}>
                              {action.title}
                            </h5>
                            <p className="text-gray-400 text-sm mb-2">{action.description}</p>
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(action.difficulty)}`}>
                                {action.difficulty}
                              </span>
                              <span className="text-gray-500 text-xs">{action.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className={`px-3 py-1 rounded-full ${getPriorityColor(selectedInsight.priorityScore)}`}>
                      Priority {selectedInsight.priorityScore}/5
                    </span>
                    <span>Impact: {selectedInsight.estimatedImpact}</span>
                  </div>
                  
                  {selectedInsight.feedback ? (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-sm">Rated {selectedInsight.feedback.rating}/5</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                        Helpful
                      </button>
                      <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors">
                        Not Helpful
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMentor;