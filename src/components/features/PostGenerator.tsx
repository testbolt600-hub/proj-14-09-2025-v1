import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  BarChart3, 
  Send, 
  Calendar as CalendarIcon, 
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PostGenerator = () => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [industry, setIndustry] = useState('technology');

  const characterLimit = 3000;
  const characterCount = content.length;

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'thought-provoking', label: 'Thought-provoking' },
    { value: 'inspiring', label: 'Inspiring' },
    { value: 'educational', label: 'Educational' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'sales', label: 'Sales' },
    { value: 'education', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedContent = `💡 ${prompt}

Here's an insightful perspective on this topic that I've been thinking about:

In today's fast-paced business environment, understanding ${prompt.toLowerCase()} has become more crucial than ever. Here are 3 key insights I've learned:

1️⃣ First insight: The importance of staying ahead of industry trends
2️⃣ Second insight: Building strong professional relationships
3️⃣ Third insight: Continuous learning and adaptation

What's your experience with ${prompt.toLowerCase()}? I'd love to hear your thoughts in the comments below.

#LinkedIn #ProfessionalDevelopment #${industry.charAt(0).toUpperCase() + industry.slice(1)}`;

      setContent(generatedContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAnalysis = {
        clarity: 8,
        grammar: 10,
        hook: 7,
        cta: 9,
        formatting: 'A',
        suggestions: [
          'Consider adding more specific examples',
          'The hook could be stronger - try starting with a question',
          'Great use of emojis and formatting!'
        ]
      };
      
      const totalScore = Math.round(
        (mockAnalysis.clarity + mockAnalysis.grammar + mockAnalysis.hook + mockAnalysis.cta) / 4 * 10 + 
        (mockAnalysis.formatting === 'A' ? 20 : mockAnalysis.formatting === 'B' ? 15 : 10)
      );
      
      setScore(totalScore);
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing content:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePublish = () => {
    // Simulate publishing
    alert('Post published successfully!');
  };

  const handleSchedule = () => {
    // Open scheduling modal
    alert('Scheduling feature coming soon!');
  };

  const handleSaveDraft = () => {
    // Save to drafts
    alert('Draft saved successfully!');
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
          <PenTool className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Post Generator</h1>
          <p className="text-slate-300 mt-1">Create optimized LinkedIn posts with AI assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Generation */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl hover:border-blue-400/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              AI Content Generation
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    {tones.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  >
                    {industries.map((i) => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Topic or Idea
                </label>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., importance of networking in tech industry"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Post
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg hover:border-blue-400/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Content Editor</h3>
              <div className="text-sm text-slate-400">
                {characterCount}/{characterLimit}
              </div>
            </div>
            
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your LinkedIn post here or generate content with AI..."
              className="w-full h-64 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
              maxLength={characterLimit}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!content.trim() || isAnalyzing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-blue-500/25"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  Check Score
                </>
              )}
            </button>
            
            <button
              onClick={handlePublish}
              disabled={!content.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-green-500/25"
            >
              <Send className="w-4 h-4" />
              Publish Now
            </button>
            
            <button
              onClick={handleSchedule}
              disabled={!content.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-500/25"
            >
              <CalendarIcon className="w-4 h-4" />
              Schedule
            </button>
            
            <button
              onClick={handleSaveDraft}
              disabled={!content.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-slate-500/25"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Score Display */}
          {score !== null && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg hover:border-blue-400/50 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Content Score
              </h3>
              
              <div className="text-center mb-6">
                <div className={`text-4xl font-bold mb-2 ${
                  score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {score}
                </div>
                <div className="text-slate-400">out of 100</div>
              </div>

              {analysis && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Clarity</span>
                      <span className="text-white">{analysis.clarity}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Grammar</span>
                      <span className="text-white">{analysis.grammar}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Hook Strength</span>
                      <span className="text-white">{analysis.hook}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Call-to-Action</span>
                      <span className="text-white">{analysis.cta}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Formatting</span>
                      <span className="text-white">{analysis.formatting}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-600">
                    <h4 className="text-sm font-semibold text-white mb-3">Suggestions</h4>
                    <div className="space-y-2">
                      {analysis.suggestions.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg hover:border-blue-400/50 transition-all duration-300">
            <h3 className="text-lg font-semibold text-white mb-4">Writing Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Start with a hook</p>
                  <p className="text-xs text-slate-400 mt-1">Begin with a question, statistic, or bold statement</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Use emojis sparingly</p>
                  <p className="text-xs text-slate-400 mt-1">1-3 emojis can enhance readability</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Include a call-to-action</p>
                  <p className="text-xs text-slate-400 mt-1">Ask for engagement or opinions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Keep paragraphs short</p>
                  <p className="text-xs text-slate-400 mt-1">1-3 sentences per paragraph for mobile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGenerator;

