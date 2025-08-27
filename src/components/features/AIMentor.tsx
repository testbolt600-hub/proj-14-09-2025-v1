import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Star, 
  Calendar,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Award,
  BarChart3,
  Lightbulb,
  Users,
  Eye,
  ArrowRight,
  Plus,
  Settings,
  Zap,
  Clock,
  MessageCircle,
  FileText,
  Link,
  Download
} from 'lucide-react';

interface BrandScore {
  overall: number;
  visibility: number;
  engagement: number;
  professionalPresence: number;
  networkQuality: number;
}

interface Recommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: number;
  estimatedImpact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  actionSteps: string[];
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
  userFeedback?: {
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
  goalType: string;
  targetValue: number;
  currentValue: number;
  deadline: string;
  progress: number;
}

const AIMentor = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'insights' | 'goals' | 'analysis' | 'settings'>('dashboard');
  const [brandScore, setBrandScore] = useState<BrandScore | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [insights, setInsights] = useState<MentorInsight[]>([]);
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goalType: '',
    targetValue: 0,
    deadline: ''
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading user data
    setBrandScore({
      overall: 78,
      visibility: 82,
      engagement: 74,
      professionalPresence: 80,
      networkQuality: 76
    });

    setRecommendations([
      {
        id: '1',
        category: 'LinkedIn Optimization',
        title: 'Optimize Your LinkedIn Headline',
        description: 'Your current headline is too generic. Add specific skills and value proposition.',
        priority: 5,
        estimatedImpact: '+15% profile views',
        difficulty: 'easy',
        actionSteps: [
          'Add your primary skill or expertise',
          'Include a value proposition',
          'Use industry keywords',
          'Keep it under 220 characters'
        ]
      },
      {
        id: '2',
        category: 'Content Strategy',
        title: 'Increase Posting Consistency',
        description: 'Regular posting builds authority and keeps you visible to your network.',
        priority: 4,
        estimatedImpact: '+25% engagement',
        difficulty: 'medium',
        actionSteps: [
          'Create a content calendar',
          'Post 3-5 times per week',
          'Share industry insights',
          'Engage with others\' content'
        ]
      }
    ]);

    setInsights([
      {
        id: '1',
        type: 'weekly',
        title: 'Your LinkedIn Engagement is Trending Up! 📈',
        content: 'Great progress this week! Your brand score improved by 3 points. Your visibility and engagement metrics are trending upward. Keep up the momentum by focusing on consistent, valuable content sharing.',
        actionItems: [
          {
            id: '1',
            title: 'Share industry insights',
            description: 'Post about recent trends in your field',
            difficulty: 'easy',
            estimatedTime: '15 minutes',
            category: 'content',
            completed: false
          },
          {
            id: '2',
            title: 'Engage with network posts',
            description: 'Comment meaningfully on 5 posts from your network',
            difficulty: 'easy',
            estimatedTime: '10 minutes',
            category: 'engagement',
            completed: false
          }
        ],
        priorityScore: 4,
        estimatedImpact: '+12% engagement',
        generatedAt: '2024-01-21T10:00:00Z',
        isRead: false
      }
    ]);

    setGoals([
      {
        id: '1',
        goalType: 'Increase LinkedIn Followers',
        targetValue: 1000,
        currentValue: 750,
        deadline: '2024-03-01',
        progress: 75
      },
      {
        id: '2',
        goalType: 'Improve Engagement Rate',
        targetValue: 5,
        currentValue: 3.2,
        deadline: '2024-02-15',
        progress: 64
      }
    ]);
  }, []);

  const startBrandAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update brand score after analysis
      setBrandScore({
        overall: 82,
        visibility: 85,
        engagement: 78,
        professionalPresence: 83,
        networkQuality: 79
      });
    } catch (error) {
      console.error('Error analyzing brand:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const createGoal = async () => {
    if (!newGoal.goalType || !newGoal.targetValue || !newGoal.deadline) return;
    
    const goal: UserGoal = {
      id: Date.now().toString(),
      goalType: newGoal.goalType,
      targetValue: newGoal.targetValue,
      currentValue: 0,
      deadline: newGoal.deadline,
      progress: 0
    };
    
    setGoals([...goals, goal]);
    setShowNewGoalModal(false);
    setNewGoal({ goalType: '', targetValue: 0, deadline: '' });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return 'bg-red-500/20 text-red-400';
    if (priority >= 3) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-green-500/20 text-green-400';
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'hard': return <Target className="w-4 h-4 text-red-400" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">AI Mentor for Personal Brand Growth</h1>
          <p className="text-gray-400 mt-1">Your personal AI coach for career and brand development</p>
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
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'analysis' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Brand Analysis
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Settings
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
                    <div className={`text-5xl font-bold mb-2 ${getScoreColor(brandScore.overall)}`}>
                      {brandScore.overall}
                    </div>
                    <div className="text-gray-400">Overall Brand Score</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {brandScore.overall >= 80 ? 'Excellent' : 
                       brandScore.overall >= 60 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>

                  <div className="space-y-3">
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
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-400" />
                Recent AI Insights
              </h3>
              
              <div className="space-y-4">
                {insights.slice(0, 2).map((insight) => (
                  <div key={insight.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-50 mb-1">{insight.title}</h4>
                        <p className="text-gray-300 text-sm mb-2">{insight.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(insight.generatedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {insight.estimatedImpact}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.type === 'weekly' ? 'bg-blue-500/20 text-blue-400' :
                        insight.type === 'monthly' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {insight.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={startBrandAnalysis}
                  disabled={isAnalyzing}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <TrendingUp className="w-5 h-5" />
                  )}
                  {isAnalyzing ? 'Analyzing...' : 'Run Brand Analysis'}
                </button>
                
                <button
                  onClick={() => setShowNewGoalModal(true)}
                  className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Set New Goal
                </button>
                
                <button
                  onClick={() => setLinkedinConnected(!linkedinConnected)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    linkedinConnected 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  <Link className="w-5 h-5" />
                  {linkedinConnected ? 'LinkedIn Connected' : 'Connect LinkedIn'}
                </button>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Brand Score</span>
                  <span className="text-green-400 font-semibold">+5 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Goals Completed</span>
                  <span className="text-blue-400 font-semibold">2 of 3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Insights Generated</span>
                  <span className="text-purple-400 font-semibold">8 insights</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Actions Completed</span>
                  <span className="text-green-400 font-semibold">12 actions</span>
                </div>
              </div>
            </div>

            {/* AI Tips */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Tips</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Trending Opportunity</p>
                  <p className="text-gray-300 text-sm">AI and automation topics are getting 40% more engagement this week</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">Best Time to Post</p>
                  <p className="text-gray-300 text-sm">Your audience is most active on Tuesdays at 2 PM</p>
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
              <h3 className="text-lg font-semibold text-gray-50 mb-6">AI-Generated Insights</h3>
              
              <div className="space-y-6">
                {insights.map((insight) => (
                  <div key={insight.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-50 mb-2">{insight.title}</h4>
                        <p className="text-gray-300 leading-relaxed mb-4">{insight.content}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        insight.type === 'weekly' ? 'bg-blue-500/20 text-blue-400' :
                        insight.type === 'monthly' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {insight.type}
                      </span>
                    </div>

                    {insight.actionItems.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-50 mb-3">Recommended Actions:</h5>
                        <div className="space-y-2">
                          {insight.actionItems.map((action) => (
                            <div key={action.id} className="flex items-center gap-3 p-3 bg-[#111827] rounded-lg">
                              <input
                                type="checkbox"
                                checked={action.completed}
                                onChange={() => {
                                  // Update action completion status
                                }}
                                className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                              />
                              <div className="flex-1">
                                <h6 className="font-medium text-gray-50 text-sm">{action.title}</h6>
                                <p className="text-gray-400 text-xs">{action.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {getDifficultyIcon(action.difficulty)}
                                <span className="text-gray-400 text-xs">{action.estimatedTime}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                      <div className="text-sm text-gray-400">
                        Generated {new Date(insight.generatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                          Mark Helpful
                        </button>
                        <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Insight Types</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Weekly Progress Updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Monthly Strategic Reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Achievement Celebrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Milestone Notifications</span>
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
                <h3 className="text-lg font-semibold text-gray-50">Your Goals</h3>
                <button
                  onClick={() => setShowNewGoalModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  New Goal
                </button>
              </div>
              
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-50">{goal.goalType}</h4>
                      <span className="text-sm text-gray-400">
                        {goal.currentValue} / {goal.targetValue}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                      <span className={`font-medium ${
                        goal.progress >= 80 ? 'text-green-400' :
                        goal.progress >= 50 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {goal.progress}% complete
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Goal Categories</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  LinkedIn Growth
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Engagement Rate
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Network Building
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Content Creation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-50 mb-6">Brand Analysis</h3>
          
          <div className="text-center py-20">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-50 mb-2">Comprehensive Brand Analysis</h4>
            <p className="text-gray-400 mb-6">Get detailed insights into your professional brand across all platforms</p>
            <button
              onClick={startBrandAnalysis}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
            </button>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-50 mb-6">AI Mentor Settings</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-50 mb-4">Notification Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Weekly insights</span>
                  <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-indigo-600">
                    <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Monthly reviews</span>
                  <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-indigo-600">
                    <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Achievement notifications</span>
                  <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-600">
                    <span className="inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-50 mb-4">Data Sync Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Sync Frequency</label>
                  <select className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Manual only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Goal Modal */}
      {showNewGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Set New Goal</h3>
              <button
                onClick={() => setShowNewGoalModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Goal Type</label>
                <select
                  value={newGoal.goalType}
                  onChange={(e) => setNewGoal({...newGoal, goalType: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50"
                >
                  <option value="">Select goal type</option>
                  <option value="Increase LinkedIn Followers">Increase LinkedIn Followers</option>
                  <option value="Improve Engagement Rate">Improve Engagement Rate</option>
                  <option value="Grow Network Connections">Grow Network Connections</option>
                  <option value="Increase Profile Views">Increase Profile Views</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Value</label>
                <input
                  type="number"
                  value={newGoal.targetValue}
                  onChange={(e) => setNewGoal({...newGoal, targetValue: Number(e.target.value)})}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewGoalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createGoal}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIMentor;