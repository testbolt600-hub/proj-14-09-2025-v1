import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter, 
  FileText,
  RefreshCw,
  Bell,
  Target,
  BarChart3,
  Lightbulb,
  ExternalLink,
  Star,
  Clock,
  Zap,
  Brain,
  Settings,
  Plus,
  X,
  ArrowRight,
  Filter,
  Calendar
} from 'lucide-react';

interface ReputationScore {
  overall: number;
  visibility: number;
  sentiment: number;
  freshness: number;
  authority: number;
}

interface BrandMention {
  id: string;
  platform: 'google' | 'linkedin' | 'twitter' | 'github' | 'medium';
  title: string;
  url: string;
  snippet: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  ranking: number;
  date: string;
  relevance: number;
  isOwned: boolean;
}

interface SEORecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: 'visibility' | 'content' | 'optimization' | 'reputation';
  title: string;
  description: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  actionSteps: string[];
  estimatedTime: string;
  platforms: string[];
}

interface Alert {
  id: string;
  type: 'new_mention' | 'ranking_change' | 'negative_content' | 'visibility_drop';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  createdAt: string;
  isRead: boolean;
  actionRequired: boolean;
}

const ReputationMonitor = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mentions' | 'seo' | 'alerts' | 'settings'>('dashboard');
  const [reputationScore, setReputationScore] = useState<ReputationScore | null>(null);
  const [brandMentions, setBrandMentions] = useState<BrandMention[]>([]);
  const [seoRecommendations, setSeoRecommendations] = useState<SEORecommendation[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanDate, setLastScanDate] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['google', 'linkedin', 'twitter', 'github']);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterSentiment, setFilterSentiment] = useState<string>('all');
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);
  const [alertFrequency, setAlertFrequency] = useState<'immediate' | 'daily' | 'weekly'>('daily');

  // Mock data initialization
  useEffect(() => {
    setReputationScore({
      overall: 78,
      visibility: 82,
      sentiment: 85,
      freshness: 71,
      authority: 76
    });

    setBrandMentions([
      {
        id: '1',
        platform: 'linkedin',
        title: 'John Doe - Senior Software Engineer at TechCorp',
        url: 'https://linkedin.com/in/johndoe',
        snippet: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies...',
        sentiment: 'positive',
        ranking: 1,
        date: '2024-01-20',
        relevance: 95,
        isOwned: true
      },
      {
        id: '2',
        platform: 'github',
        title: 'johndoe (John Doe) · GitHub',
        url: 'https://github.com/johndoe',
        snippet: 'Software engineer building scalable web applications. 15 repositories, 234 followers...',
        sentiment: 'positive',
        ranking: 2,
        date: '2024-01-19',
        relevance: 88,
        isOwned: true
      },
      {
        id: '3',
        platform: 'google',
        title: 'John Doe - Conference Speaker at DevCon 2023',
        url: 'https://devcon2023.com/speakers/john-doe',
        snippet: 'John Doe will be speaking about modern web development practices...',
        sentiment: 'positive',
        ranking: 3,
        date: '2023-11-15',
        relevance: 82,
        isOwned: false
      },
      {
        id: '4',
        platform: 'medium',
        title: 'Building Scalable React Applications - John Doe',
        url: 'https://medium.com/@johndoe/building-scalable-react',
        snippet: 'In this article, I share my experience building large-scale React applications...',
        sentiment: 'positive',
        ranking: 5,
        date: '2023-08-22',
        relevance: 79,
        isOwned: true
      },
      {
        id: '5',
        platform: 'google',
        title: 'Old Project Issues - John Doe Repository',
        url: 'https://github.com/johndoe/old-project/issues',
        snippet: 'Multiple unresolved issues in this repository from 2021...',
        sentiment: 'negative',
        ranking: 8,
        date: '2021-03-10',
        relevance: 45,
        isOwned: true
      }
    ]);

    setSeoRecommendations([
      {
        id: '1',
        priority: 'high',
        category: 'visibility',
        title: 'Create Professional Website',
        description: 'You don\'t have a personal website ranking on Page 1. A professional site would significantly boost your visibility.',
        impact: '+25% search visibility',
        difficulty: 'medium',
        actionSteps: [
          'Register a domain with your name (johndoe.com)',
          'Create a professional landing page',
          'Include your bio, experience, and contact info',
          'Optimize for SEO with relevant keywords'
        ],
        estimatedTime: '4-6 hours',
        platforms: ['google', 'bing']
      },
      {
        id: '2',
        priority: 'high',
        category: 'reputation',
        title: 'Address Negative GitHub Repository',
        description: 'An old repository with unresolved issues is ranking on Page 1. This could create a negative first impression.',
        impact: 'Remove negative impression',
        difficulty: 'easy',
        actionSteps: [
          'Archive or delete the problematic repository',
          'Update repository descriptions for active projects',
          'Pin your best repositories to GitHub profile',
          'Add comprehensive README files'
        ],
        estimatedTime: '1-2 hours',
        platforms: ['github', 'google']
      },
      {
        id: '3',
        priority: 'medium',
        category: 'content',
        title: 'Publish Fresh Content',
        description: 'Your most recent content is from 6 months ago. Fresh content improves search rankings and shows you\'re active.',
        impact: '+15% content freshness',
        difficulty: 'medium',
        actionSteps: [
          'Write 2-3 new blog posts or articles',
          'Share recent project updates',
          'Post about industry trends or insights',
          'Update your LinkedIn with recent achievements'
        ],
        estimatedTime: '3-4 hours per piece',
        platforms: ['medium', 'linkedin', 'personal-site']
      },
      {
        id: '4',
        priority: 'medium',
        category: 'optimization',
        title: 'Optimize LinkedIn Headline for SEO',
        description: 'Your LinkedIn headline could include more searchable keywords that recruiters and clients use.',
        impact: '+20% LinkedIn discoverability',
        difficulty: 'easy',
        actionSteps: [
          'Research keywords in your industry',
          'Include specific technologies and skills',
          'Add your value proposition',
          'Test different variations'
        ],
        estimatedTime: '30 minutes',
        platforms: ['linkedin']
      }
    ]);

    setAlerts([
      {
        id: '1',
        type: 'negative_content',
        title: 'Negative Content Detected',
        description: 'An old GitHub repository with issues is ranking #8 for your name',
        severity: 'warning',
        createdAt: '2024-01-21T10:00:00Z',
        isRead: false,
        actionRequired: true
      },
      {
        id: '2',
        type: 'visibility_drop',
        title: 'Search Visibility Decreased',
        description: 'Your overall search visibility dropped by 12% this week',
        severity: 'warning',
        createdAt: '2024-01-20T14:30:00Z',
        isRead: false,
        actionRequired: true
      },
      {
        id: '3',
        type: 'new_mention',
        title: 'New Positive Mention',
        description: 'You were mentioned in a DevCon 2024 speaker announcement',
        severity: 'info',
        createdAt: '2024-01-19T09:15:00Z',
        isRead: true,
        actionRequired: false
      }
    ]);

    setLastScanDate('2024-01-21T08:00:00Z');
  }, []);

  const startReputationScan = async () => {
    setIsScanning(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Update scores and data
      setReputationScore({
        overall: 81,
        visibility: 85,
        sentiment: 87,
        freshness: 74,
        authority: 79
      });
      
      setLastScanDate(new Date().toISOString());
    } catch (error) {
      console.error('Error scanning reputation:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-500" />;
      case 'github': return <Github className="w-4 h-4 text-gray-600" />;
      case 'twitter': return <Twitter className="w-4 h-4 text-blue-400" />;
      case 'medium': return <FileText className="w-4 h-4 text-green-600" />;
      case 'google': return <Search className="w-4 h-4 text-red-500" />;
      default: return <Globe className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-500/20';
      case 'negative': return 'text-red-400 bg-red-500/20';
      case 'neutral': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'new_mention': return <Bell className="w-4 h-4 text-blue-400" />;
      case 'ranking_change': return <TrendingUp className="w-4 h-4 text-purple-400" />;
      case 'negative_content': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'visibility_drop': return <Eye className="w-4 h-4 text-orange-400" />;
      default: return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredMentions = brandMentions.filter(mention => {
    const matchesSearch = mention.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mention.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || mention.platform === filterPlatform;
    const matchesSentiment = filterSentiment === 'all' || mention.sentiment === filterSentiment;
    
    return matchesSearch && matchesPlatform && matchesSentiment;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Reputation Monitoring & Personal SEO</h1>
          <p className="text-gray-400 mt-1">Monitor your online presence and optimize your digital brand</p>
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
          onClick={() => setActiveTab('mentions')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'mentions' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Brand Mentions
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'seo' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          SEO Recommendations
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'alerts' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Alerts ({alerts.filter(a => !a.isRead).length})
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
            {/* Reputation Score Overview */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Reputation Score
                </h3>
                <button
                  onClick={startReputationScan}
                  disabled={isScanning}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Scan Now
                    </>
                  )}
                </button>
              </div>
              
              {reputationScore && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className={`text-5xl font-bold mb-2 ${getScoreColor(reputationScore.overall)}`}>
                      {reputationScore.overall}
                    </div>
                    <div className="text-gray-400">Overall Reputation Score</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {reputationScore.overall >= 80 ? 'Excellent' : 
                       reputationScore.overall >= 60 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Search Visibility</span>
                      <span className={`font-semibold ${getScoreColor(reputationScore.visibility)}`}>
                        {reputationScore.visibility}/100
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Sentiment Score</span>
                      <span className={`font-semibold ${getScoreColor(reputationScore.sentiment)}`}>
                        {reputationScore.sentiment}/100
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Content Freshness</span>
                      <span className={`font-semibold ${getScoreColor(reputationScore.freshness)}`}>
                        {reputationScore.freshness}/100
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Authority Score</span>
                      <span className={`font-semibold ${getScoreColor(reputationScore.authority)}`}>
                        {reputationScore.authority}/100
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {lastScanDate && (
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Last scan: {new Date(lastScanDate).toLocaleString()}
                </div>
              )}
            </div>

            {/* Top Mentions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-green-400" />
                Top Search Results
              </h3>
              
              <div className="space-y-4">
                {brandMentions.slice(0, 5).map((mention) => (
                  <div key={mention.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getPlatformIcon(mention.platform)}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-50 text-sm">{mention.title}</h4>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-2">{mention.snippet}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(mention.sentiment)}`}>
                          {mention.sentiment}
                        </span>
                        <span className="text-gray-400 text-xs">#{mention.ranking}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Relevance: {mention.relevance}%</span>
                        <span>{new Date(mention.date).toLocaleDateString()}</span>
                        {mention.isOwned && (
                          <span className="text-blue-400">Your content</span>
                        )}
                      </div>
                      <a
                        href={mention.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Mentor Integration */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Mentor Insights
              </h3>
              
              <div className="space-y-4">
                <div className="bg-[#1F2937] rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">Weekly Focus: Improve Search Visibility</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Your reputation scan shows you're not appearing on Page 1 of Google for your name. 
                    This week, let's focus on creating content that will boost your search presence.
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Connected to your growth plan</span>
                  </div>
                </div>
                
                <div className="bg-[#1F2937] rounded-lg p-4">
                  <h4 className="font-medium text-blue-400 mb-2">Opportunity Detected</h4>
                  <p className="text-gray-300 text-sm">
                    Your GitHub profile is ranking well but could be optimized. 
                    The AI Mentor suggests updating your repositories and adding a professional README.
                  </p>
                </div>
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
                  onClick={() => setActiveTab('seo')}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Target className="w-5 h-5" />
                  View SEO Recommendations
                </button>
                
                <button
                  onClick={() => setActiveTab('mentions')}
                  className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Review All Mentions
                </button>
                
                <button
                  onClick={() => setActiveTab('alerts')}
                  className="w-full flex items-center gap-3 p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  Check Alerts
                </button>
              </div>
            </div>

            {/* Platform Coverage */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Platform Coverage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-300 text-sm">LinkedIn</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-300 text-sm">GitHub</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-red-500" />
                    <span className="text-gray-300 text-sm">Google Search</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">Twitter/X</span>
                  </div>
                  <X className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border ${
                    alert.severity === 'critical' ? 'border-red-500/30 bg-red-500/10' :
                    alert.severity === 'warning' ? 'border-yellow-500/30 bg-yellow-500/10' :
                    'border-blue-500/30 bg-blue-500/10'
                  }`}>
                    <div className="flex items-start gap-2">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-50 text-sm">{alert.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">{alert.description}</p>
                        <span className="text-gray-500 text-xs">
                          {new Date(alert.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brand Mentions Tab */}
      {activeTab === 'mentions' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50">Brand Mentions & Search Results</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search mentions..."
                      className="pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    <option value="all">All Platforms</option>
                    <option value="google">Google</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="github">GitHub</option>
                    <option value="twitter">Twitter</option>
                    <option value="medium">Medium</option>
                  </select>
                  <select
                    value={filterSentiment}
                    onChange={(e) => setFilterSentiment(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    <option value="all">All Sentiment</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredMentions.map((mention) => (
                  <div key={mention.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        {getPlatformIcon(mention.platform)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-50 text-sm">{mention.title}</h4>
                            <span className="text-gray-400 text-xs">#{mention.ranking}</span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2 line-clamp-2">{mention.snippet}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Relevance: {mention.relevance}%</span>
                            <span>{new Date(mention.date).toLocaleDateString()}</span>
                            {mention.isOwned && (
                              <span className="text-blue-400">Your content</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(mention.sentiment)}`}>
                          {mention.sentiment}
                        </span>
                        <a
                          href={mention.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Mention Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Mentions</span>
                  <span className="text-blue-400 font-semibold">{brandMentions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Positive</span>
                  <span className="text-green-400 font-semibold">
                    {brandMentions.filter(m => m.sentiment === 'positive').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Negative</span>
                  <span className="text-red-400 font-semibold">
                    {brandMentions.filter(m => m.sentiment === 'negative').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Your Content</span>
                  <span className="text-purple-400 font-semibold">
                    {brandMentions.filter(m => m.isOwned).length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Platform Performance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-300 text-sm">LinkedIn</span>
                  </div>
                  <span className="text-green-400 text-sm">Strong</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-300 text-sm">GitHub</span>
                  </div>
                  <span className="text-yellow-400 text-sm">Needs Work</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-red-500" />
                    <span className="text-gray-300 text-sm">Google</span>
                  </div>
                  <span className="text-red-400 text-sm">Weak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO Recommendations Tab */}
      {activeTab === 'seo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">AI-Powered SEO Recommendations</h3>
              
              <div className="space-y-6">
                {seoRecommendations.map((rec) => (
                  <div key={rec.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(rec.priority)}`}>
                          {rec.priority} priority
                        </span>
                        <span className="text-gray-400 text-sm">{rec.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{rec.difficulty}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold text-gray-50 mb-3">{rec.title}</h4>
                    <p className="text-gray-300 mb-4">{rec.description}</p>
                    
                    <div className="bg-[#111827] rounded-lg p-4 mb-4">
                      <h5 className="font-medium text-gray-50 mb-3">Action Steps:</h5>
                      <div className="space-y-2">
                        {rec.actionSteps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-gray-300 text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-indigo-400 font-medium">Impact: {rec.impact}</span>
                        <span className="text-gray-400">Time: {rec.estimatedTime}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Mark Complete
                        </button>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Add to Plan
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
              <h3 className="text-lg font-semibold text-gray-50 mb-4">SEO Progress</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">3/7</div>
                  <div className="text-gray-400 text-sm">Recommendations Completed</div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '43%' }}></div>
                </div>
                
                <div className="text-center text-sm text-gray-400">
                  43% of SEO improvements completed
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Impact Forecast</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium text-sm mb-1">Visibility Boost</h4>
                  <p className="text-gray-300 text-sm">+40% search visibility expected</p>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">Authority Growth</h4>
                  <p className="text-gray-300 text-sm">+15 authority score potential</p>
                </div>
                
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="text-purple-400 font-medium text-sm mb-1">Timeline</h4>
                  <p className="text-gray-300 text-sm">2-3 months for full impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Reputation Alerts</h3>
              
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`rounded-lg p-4 border ${
                    alert.severity === 'critical' ? 'border-red-500/30 bg-red-500/10' :
                    alert.severity === 'warning' ? 'border-yellow-500/30 bg-yellow-500/10' :
                    'border-blue-500/30 bg-blue-500/10'
                  } ${!alert.isRead ? 'ring-2 ring-blue-500/20' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-50 mb-1">{alert.title}</h4>
                          <p className="text-gray-300 text-sm mb-2">{alert.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                            <span className={`px-2 py-1 rounded-full ${
                              alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                              alert.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {alert.severity}
                            </span>
                          </div>
                        </div>
                      </div>
                      {!alert.isRead && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    
                    {alert.actionRequired && (
                      <div className="flex gap-2">
                        <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Take Action
                        </button>
                        <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Mark as Read
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Alert Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Real-time Monitoring</span>
                  <button className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                    monitoringEnabled ? 'bg-indigo-600' : 'bg-gray-600'
                  }`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition ${
                      monitoringEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}></span>
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Alert Frequency</label>
                  <select
                    value={alertFrequency}
                    onChange={(e) => setAlertFrequency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="immediate">Immediate</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Summary</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Alert Types</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">New mentions</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">Ranking changes</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300 text-sm">Negative content</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-300 text-sm">Visibility drops</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-6">Monitoring Settings</h3>
            
            <div className="space-y-8">
              {/* Platform Selection */}
              <div>
                <h4 className="font-medium text-gray-50 mb-4">Platforms to Monitor</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: 'google', name: 'Google Search', icon: Search, color: 'text-red-500' },
                    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-500' },
                    { id: 'github', name: 'GitHub', icon: Github, color: 'text-gray-600' },
                    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-blue-400' },
                    { id: 'medium', name: 'Medium', icon: FileText, color: 'text-green-600' },
                    { id: 'personal', name: 'Personal Sites', icon: Globe, color: 'text-purple-500' }
                  ].map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);
                    
                    return (
                      <button
                        key={platform.id}
                        onClick={() => {
                          setSelectedPlatforms(prev => 
                            isSelected 
                              ? prev.filter(p => p !== platform.id)
                              : [...prev, platform.id]
                          );
                        }}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${platform.color}`} />
                          <span className={`font-medium ${isSelected ? 'text-indigo-400' : 'text-gray-50'}`}>
                            {platform.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Monitoring Frequency */}
              <div>
                <h4 className="font-medium text-gray-50 mb-4">Scan Frequency</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600">
                    <input
                      type="radio"
                      name="frequency"
                      value="daily"
                      defaultChecked
                      className="text-indigo-500"
                    />
                    <div>
                      <div className="text-white font-medium">Daily Scans</div>
                      <div className="text-gray-400 text-sm">Comprehensive daily monitoring</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer hover:border-gray-600">
                    <input
                      type="radio"
                      name="frequency"
                      value="weekly"
                      className="text-indigo-500"
                    />
                    <div>
                      <div className="text-white font-medium">Weekly Scans</div>
                      <div className="text-gray-400 text-sm">Weekly comprehensive reports</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Keywords to Monitor */}
              <div>
                <h4 className="font-medium text-gray-50 mb-4">Keywords to Monitor</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your full name (automatically monitored)"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Professional title (e.g., Software Engineer)"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Company name (optional)"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Save Settings */}
              <div className="flex justify-end">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReputationMonitor;