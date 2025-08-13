import React, { useState } from 'react';
import { 
  RefreshCw, 
  Link, 
  FileText, 
  Video, 
  Mic,
  Sparkles,
  Download,
  Eye,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface RepurposedPost {
  id: string;
  format: string;
  title: string;
  content: string;
  angle: string;
}

const RepurposeContent = () => {
  const [url, setUrl] = useState('');
  const [contentType, setContentType] = useState('');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedAngle, setSelectedAngle] = useState('summarize');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sourceContent, setSourceContent] = useState<any>(null);
  const [repurposedPosts, setRepurposedPosts] = useState<RepurposedPost[]>([]);

  const formats = [
    {
      id: 'teaser',
      name: 'Teaser Post',
      description: 'Short hook to drive traffic back to original content',
      icon: FileText,
      length: '100-150 chars'
    },
    {
      id: 'insights',
      name: 'Key Insights',
      description: 'Share valuable takeaways from the content',
      icon: CheckCircle,
      length: '200-300 words'
    },
    {
      id: 'listicle',
      name: 'Listicle Post',
      description: 'Break down content into digestible points',
      icon: FileText,
      length: '250-400 words'
    },
    {
      id: 'carousel',
      name: 'Carousel Outline',
      description: 'Structure for visual storytelling format',
      icon: RefreshCw,
      length: '5-7 slides'
    },
    {
      id: 'quote',
      name: 'Quote Graphic',
      description: 'Highlight powerful statements',
      icon: Sparkles,
      length: '50-100 words'
    }
  ];

  const angles = [
    {
      id: 'summarize',
      name: 'Summarize Key Points',
      description: 'Distill main arguments and conclusions'
    },
    {
      id: 'contrarian',
      name: 'Find Contrarian Opinion',
      description: 'Present alternative viewpoint or challenge assumptions'
    },
    {
      id: 'questions',
      name: 'Ask Questions',
      description: 'Transform statements into discussion starters'
    },
    {
      id: 'personal',
      name: 'Personal Experience',
      description: 'Connect content to your own experience'
    },
    {
      id: 'industry',
      name: 'Industry Application',
      description: 'Apply general concepts to specific industry'
    }
  ];

  const detectContentType = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'video';
    } else if (url.includes('podcast') || url.includes('spotify.com')) {
      return 'podcast';
    } else {
      return 'article';
    }
  };

  const analyzeContent = async () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    const type = detectContentType(url);
    setContentType(type);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockContent = {
        title: "The Future of Remote Work: 5 Trends to Watch",
        author: "Jane Smith",
        type: type,
        summary: "An insightful article about the evolution of remote work and emerging trends that will shape the future workplace.",
        keyPoints: [
          "Hybrid work models are becoming the new standard",
          "AI tools are transforming productivity",
          "Company culture requires intentional effort in remote settings",
          "Mental health support is increasingly important",
          "Skill development is shifting towards digital competencies"
        ],
        url: url
      };
      
      setSourceContent(mockContent);
    } catch (error) {
      console.error('Error analyzing content:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePosts = async () => {
    if (!sourceContent || selectedFormats.length === 0) return;
    
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generated: RepurposedPost[] = selectedFormats.map(format => {
        const formatData = formats.find(f => f.id === format);
        
        let content = '';
        switch (format) {
          case 'teaser':
            content = `🚀 Just read an amazing article about ${sourceContent.title.toLowerCase()}. The insights on hybrid work models are game-changing!\n\nWhat's your take on the future of remote work? 👇\n\nRead the full article: ${sourceContent.url}`;
            break;
          case 'insights':
            content = `🎯 Key insights from "${sourceContent.title}"\n\n1️⃣ Hybrid work models are becoming the new standard\n2️⃣ AI tools are transforming how we work\n3️⃣ Company culture requires intentional effort remotely\n\nWhich of these resonates most with your experience?\n\n📖 Source: ${sourceContent.author}`;
            break;
          case 'listicle':
            content = `5 Remote Work Trends That Will Shape Your Career 🌟\n\nBased on insights from ${sourceContent.author}'s latest article:\n\n1. Hybrid models becoming standard\n2. AI-powered productivity tools\n3. Intentional culture building\n4. Focus on mental health\n5. Digital skill development\n\nWhich trend are you most excited about?`;
            break;
          case 'carousel':
            content = `Slide 1: ${sourceContent.title}\nSlide 2: The Challenge\nSlide 3: Trend 1 - Hybrid Models\nSlide 4: Trend 2 - AI Tools\nSlide 5: Trend 3 - Culture\nSlide 6: Take Action`;
            break;
          case 'quote':
            content = `"Hybrid work models are becoming the new standard, and companies that adapt quickly will have a competitive advantage."\n\n- ${sourceContent.author}\n\nDo you agree? Share your thoughts below! 👇`;
            break;
        }
        
        return {
          id: `${format}-${Date.now()}`,
          format: formatData?.name || format,
          title: `${formatData?.name} - ${sourceContent.title}`,
          content,
          angle: selectedAngle
        };
      });
      
      setRepurposedPosts(generated);
    } catch (error) {
      console.error('Error generating posts:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFormat = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'podcast': return Mic;
      default: return FileText;
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Repurpose Content</h1>
          <p className="text-gray-400 mt-1">Transform existing content into LinkedIn posts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* URL Input */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <Link className="w-5 h-5 text-indigo-400" />
              Source Content
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/article or YouTube video URL"
                    className="flex-1 px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                  <button
                    onClick={analyzeContent}
                    disabled={!url.trim() || isAnalyzing}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze'
                    )}
                  </button>
                </div>
              </div>

              {sourceContent && (
                <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start gap-3">
                    {(() => {
                      const Icon = getContentIcon(sourceContent.type);
                      return <Icon className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />;
                    })()}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-50 mb-1">{sourceContent.title}</h4>
                      <p className="text-sm text-gray-300 mb-2">By {sourceContent.author}</p>
                      <p className="text-sm text-gray-400">{sourceContent.summary}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full">
                          {sourceContent.type}
                        </span>
                        <a 
                          href={sourceContent.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          View source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Format Selection */}
          {sourceContent && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Choose Formats
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formats.map((format) => {
                  const Icon = format.icon;
                  const isSelected = selectedFormats.includes(format.id);
                  
                  return (
                    <button
                      key={format.id}
                      onClick={() => toggleFormat(format.id)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 mt-1 ${isSelected ? 'text-indigo-400' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <h4 className={`font-medium mb-1 ${isSelected ? 'text-indigo-400' : 'text-gray-50'}`}>
                            {format.name}
                          </h4>
                          <p className="text-sm text-gray-400 mb-2">{format.description}</p>
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            {format.length}
                          </span>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-indigo-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Content Angle */}
          {sourceContent && selectedFormats.length > 0 && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Content Angle
              </h3>
              
              <div className="space-y-3">
                {angles.map((angle) => (
                  <button
                    key={angle.id}
                    onClick={() => setSelectedAngle(angle.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedAngle === angle.id
                        ? 'bg-indigo-500/20 border border-indigo-500/30'
                        : 'bg-gray-700/30 hover:bg-gray-700/50'
                    }`}
                  >
                    <h4 className="font-medium text-gray-50 mb-1">{angle.name}</h4>
                    <p className="text-sm text-gray-400">{angle.description}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={generatePosts}
                disabled={isGenerating}
                className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Posts
                  </>
                )}
              </button>
            </div>
          )}

          {/* Generated Posts */}
          {repurposedPosts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-50">Generated Posts</h3>
              {repurposedPosts.map((post) => (
                <div key={post.id} className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-50">{post.format}</h4>
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#1F2937] rounded-lg p-4">
                    <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                      {post.content}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Supported Sources */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Supported Sources</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-gray-50">Articles & Blogs</p>
                  <p className="text-xs text-gray-400">Medium, LinkedIn, personal blogs</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-sm font-medium text-gray-50">YouTube Videos</p>
                  <p className="text-xs text-gray-400">Automatic transcript extraction</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-gray-50">Podcasts</p>
                  <p className="text-xs text-gray-400">With available transcripts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Repurposing Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Always credit the original author</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Add your own perspective and insights</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Use different angles to reach various audiences</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Include a clear call-to-action</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Recent Repurposing</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-50 font-medium">The Future of AI in Business</p>
                <p className="text-gray-400">3 posts generated • 2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-50 font-medium">Remote Work Best Practices</p>
                <p className="text-gray-400">5 posts generated • 1 day ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-50 font-medium">Leadership in Tech</p>
                <p className="text-gray-400">2 posts generated • 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepurposeContent;

