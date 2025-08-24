import React, { useState } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Sparkles, 
  Target, 
  BarChart3, 
  Clock, 
  User, 
  FileText, 
  Calendar,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Send,
  Save,
  Plus,
  Filter,
  Search,
  Star,
  ArrowRight,
  Lightbulb,
  Zap,
  Globe
} from 'lucide-react';

interface TrendingTopic {
  id: string;
  title: string;
  relevanceScore: number;
  engagementPotential: number;
  competitionLevel: 'low' | 'medium' | 'high';
  timeframe: string;
  category: string;
  keywords: string[];
}

interface ContentSuggestion {
  id: string;
  topic: string;
  angle: string;
  contentType: 'post' | 'thread' | 'article' | 'carousel';
  estimatedEngagement: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeToCreate: string;
  platforms: string[];
}

interface ExpertiseArea {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  authorityScore: number;
  contentCount: number;
  lastUpdated: string;
}

const ContentEngine = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'generator' | 'calendar' | 'analytics' | 'expertise'>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<TrendingTopic | null>(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState<'post' | 'thread' | 'article' | 'carousel'>('post');
  const [tone, setTone] = useState<'professional' | 'conversational' | 'inspirational'>('professional');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin']);

  // Mock data
  const trendingTopics: TrendingTopic[] = [
    {
      id: '1',
      title: 'AI-Powered Code Reviews',
      relevanceScore: 95,
      engagementPotential: 87,
      competitionLevel: 'medium',
      timeframe: 'Next 48 hours',
      category: 'Software Development',
      keywords: ['AI', 'code review', 'automation', 'development']
    },
    {
      id: '2',
      title: 'Remote Team Leadership Strategies',
      relevanceScore: 88,
      engagementPotential: 92,
      competitionLevel: 'high',
      timeframe: 'This week',
      category: 'Leadership',
      keywords: ['remote work', 'leadership', 'team management']
    },
    {
      id: '3',
      title: 'Microservices Architecture Patterns',
      relevanceScore: 91,
      engagementPotential: 78,
      competitionLevel: 'low',
      timeframe: 'Next week',
      category: 'Architecture',
      keywords: ['microservices', 'architecture', 'scalability']
    }
  ];

  const contentSuggestions: ContentSuggestion[] = [
    {
      id: '1',
      topic: 'AI-Powered Code Reviews',
      angle: 'Share your experience implementing AI code review tools',
      contentType: 'post',
      estimatedEngagement: 87,
      difficulty: 'easy',
      timeToCreate: '5 minutes',
      platforms: ['linkedin', 'twitter']
    },
    {
      id: '2',
      topic: 'Remote Team Leadership',
      angle: 'Lessons learned from managing distributed teams',
      contentType: 'thread',
      estimatedEngagement: 92,
      difficulty: 'medium',
      timeToCreate: '10 minutes',
      platforms: ['linkedin', 'twitter']
    },
    {
      id: '3',
      topic: 'Microservices Best Practices',
      angle: 'Common pitfalls and how to avoid them',
      contentType: 'article',
      estimatedEngagement: 78,
      difficulty: 'hard',
      timeToCreate: '20 minutes',
      platforms: ['linkedin', 'medium']
    }
  ];

  const expertiseAreas: ExpertiseArea[] = [
    {
      id: '1',
      name: 'Software Development',
      level: 'expert',
      authorityScore: 85,
      contentCount: 24,
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      name: 'Team Leadership',
      level: 'intermediate',
      authorityScore: 72,
      contentCount: 12,
      lastUpdated: '2024-01-18'
    },
    {
      id: '3',
      name: 'Cloud Architecture',
      level: 'intermediate',
      authorityScore: 68,
      contentCount: 8,
      lastUpdated: '2024-01-15'
    }
  ];

  const generateContent = async (suggestion: ContentSuggestion) => {
    setIsGenerating(true);
    setSelectedTopic(trendingTopics.find(t => t.title === suggestion.topic) || null);
    
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockContent = `🚀 Just implemented AI-powered code reviews in our development workflow, and the results are fascinating!

Here's what I learned after 3 months:

✅ **Faster Reviews**: 60% reduction in review time
✅ **Better Quality**: Caught 40% more potential issues
✅ **Team Learning**: Junior devs improved faster with AI feedback

But here's the surprising part - the AI didn't replace human reviewers. Instead, it freed us up to focus on architecture decisions and mentoring.

The key was finding the right balance between automation and human insight.

What's your experience with AI development tools? Are you seeing similar productivity gains?

#SoftwareDevelopment #AI #CodeReview #TechLeadership`;

      setGeneratedContent(mockContent);
      setActiveTab('generator');
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 80) return 'text-blue-400 bg-blue-500/20';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAuthorityColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Content Engine for Thought Leadership</h1>
          <p className="text-gray-400 mt-1">AI-powered thought leadership content generation</p>
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
          onClick={() => setActiveTab('generator')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'generator' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Content Generator
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'calendar' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Content Calendar
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('expertise')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'expertise' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Expertise
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Content Suggestions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Today's Content Suggestions
              </h3>
              
              <div className="space-y-4">
                {contentSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-50 mb-1">{suggestion.topic}</h4>
                        <p className="text-gray-300 text-sm mb-2">{suggestion.angle}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" />
                            {suggestion.estimatedEngagement}% engagement
                          </span>
                          <span className={`flex items-center gap-1 ${getDifficultyColor(suggestion.difficulty)}`}>
                            <Target className="w-3 h-3" />
                            {suggestion.difficulty}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {suggestion.timeToCreate}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => generateContent(suggestion)}
                        disabled={isGenerating}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
                      >
                        {isGenerating ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Generate
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Authority Score Overview */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Authority Score Overview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">78</div>
                  <div className="text-gray-400 text-sm">Overall Authority</div>
                  <div className="text-green-400 text-xs mt-1">+12 this month</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">24</div>
                  <div className="text-gray-400 text-sm">Posts This Month</div>
                  <div className="text-green-400 text-xs mt-1">+8 vs last month</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">3.2K</div>
                  <div className="text-gray-400 text-sm">Total Engagement</div>
                  <div className="text-green-400 text-xs mt-1">+45% growth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                Trending in Your Domain
              </h3>
              
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.id} className="p-3 bg-[#1F2937] rounded-lg border border-gray-700">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-50 text-sm">{topic.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(topic.relevanceScore)}`}>
                        {topic.relevanceScore}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{topic.timeframe}</span>
                      <span className={`px-2 py-1 rounded-full ${getCompetitionColor(topic.competitionLevel)}`}>
                        {topic.competitionLevel} competition
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Content Generated</span>
                  <span className="text-purple-400 font-semibold">8 posts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Published</span>
                  <span className="text-green-400 font-semibold">6 posts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Avg. Engagement</span>
                  <span className="text-blue-400 font-semibold">4.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Authority Growth</span>
                  <span className="text-green-400 font-semibold">+3 points</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Trending Opportunity</p>
                  <p className="text-gray-300 text-sm">AI code reviews are gaining 40% more engagement this week</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">Authority Building</p>
                  <p className="text-gray-300 text-sm">Your software development content performs 25% above average</p>
                </div>
                
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-400 text-sm font-medium mb-1">Content Strategy</p>
                  <p className="text-gray-300 text-sm">Consider expanding into cloud architecture topics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Generator Tab */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Content Editor */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-purple-400" />
                  Content Editor
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
              
              {selectedTopic && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-blue-400 font-medium">{selectedTopic.title}</h4>
                      <p className="text-gray-300 text-sm">Trending in {selectedTopic.category}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(selectedTopic.relevanceScore)}`}>
                      {selectedTopic.relevanceScore}% relevant
                    </span>
                  </div>
                </div>
              )}

              <textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                placeholder="Generated content will appear here..."
                className="w-full h-64 px-4 py-3 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none resize-none"
              />

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-400">
                  {generatedContent.length} characters
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert('Content saved as draft!')}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Draft
                  </button>
                  <button
                    onClick={() => alert('Content published!')}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Publish
                  </button>
                </div>
              </div>
            </div>

            {/* Content Controls */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Content Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Content Type</label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                  >
                    <option value="post">LinkedIn Post</option>
                    <option value="thread">Twitter Thread</option>
                    <option value="article">Long-form Article</option>
                    <option value="carousel">Carousel Slides</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                  >
                    <option value="professional">Professional</option>
                    <option value="conversational">Conversational</option>
                    <option value="inspirational">Inspirational</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platforms</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPlatforms(prev => 
                        prev.includes('linkedin') 
                          ? prev.filter(p => p !== 'linkedin')
                          : [...prev, 'linkedin']
                      )}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedPlatforms.includes('linkedin')
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => setSelectedPlatforms(prev => 
                        prev.includes('twitter') 
                          ? prev.filter(p => p !== 'twitter')
                          : [...prev, 'twitter']
                      )}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedPlatforms.includes('twitter')
                          ? 'bg-blue-400 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Twitter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Content Quality Score */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Content Quality</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-400 mb-1">92</div>
                <div className="text-gray-400 text-sm">Quality Score</div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Authenticity</span>
                  <span className="text-green-400">Excellent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Trend Relevance</span>
                  <span className="text-green-400">Very Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Engagement Potential</span>
                  <span className="text-blue-400">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Authority Building</span>
                  <span className="text-green-400">Strong</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Generate variations
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Schedule for optimal time
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Add to content series
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Export to other platforms
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expertise Tab */}
      {activeTab === 'expertise' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" />
                Your Expertise Areas
              </h3>
              
              <div className="space-y-4">
                {expertiseAreas.map((area) => (
                  <div key={area.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-50">{area.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            area.level === 'expert' ? 'bg-green-500/20 text-green-400' :
                            area.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {area.level}
                          </span>
                          <span className="text-xs text-gray-400">{area.contentCount} posts</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getAuthorityColor(area.authorityScore)}`}>
                          {area.authorityScore}
                        </div>
                        <div className="text-xs text-gray-400">Authority Score</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          area.authorityScore >= 80 ? 'bg-green-400' :
                          area.authorityScore >= 60 ? 'bg-yellow-400' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${area.authorityScore}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                Add New Expertise Area
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Growth Opportunities</h3>
              <div className="space-y-3">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="text-purple-400 font-medium text-sm mb-1">Emerging Topic</h4>
                  <p className="text-gray-300 text-sm">AI Ethics in Development</p>
                  <p className="text-gray-400 text-xs mt-1">Low competition, high relevance</p>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium text-sm mb-1">Skill Gap</h4>
                  <p className="text-gray-300 text-sm">DevOps & Infrastructure</p>
                  <p className="text-gray-400 text-xs mt-1">High demand in your network</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Content Strategy</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Focus on software development content (your strongest area)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Gradually introduce leadership topics</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Share practical examples and case studies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            Content Calendar
          </h3>
          
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-50 mb-2">Content Calendar Coming Soon</h4>
            <p className="text-gray-400">Visual calendar interface for content planning and scheduling</p>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Thought Leadership Analytics
              </h3>
              
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive analytics charts coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Authority Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Overall Authority</span>
                  <span className="text-purple-400 font-semibold">78/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Content Consistency</span>
                  <span className="text-green-400 font-semibold">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Trend Alignment</span>
                  <span className="text-blue-400 font-semibold">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Engagement Quality</span>
                  <span className="text-green-400 font-semibold">4.2/5</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Top Performing Content</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">AI in Software Development</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>2.1K engagements</span>
                    <span>Jan 18</span>
                  </div>
                </div>
                
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">Remote Team Management</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>1.8K engagements</span>
                    <span>Jan 15</span>
                  </div>
                </div>
                
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">Code Review Best Practices</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>1.5K engagements</span>
                    <span>Jan 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEngine;