import React, { useState } from 'react';
import { 
  Image, 
  Sparkles, 
  Download, 
  Eye, 
  Palette,
  Type,
  BarChart3,
  RefreshCw,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  type: 'title' | 'content' | 'conclusion';
}

const CarouselMaker = () => {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('business professionals');
  const [slideCount, setSlideCount] = useState(6);
  const [selectedTemplate, setSelectedTemplate] = useState('professional-blue');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [flowScore, setFlowScore] = useState<number | null>(null);

  const templates = [
    {
      id: 'professional-blue',
      name: 'Professional Blue',
      category: 'Business',
      preview: 'bg-gradient-to-br from-blue-600 to-blue-800',
      description: 'Clean and professional design'
    },
    {
      id: 'modern-purple',
      name: 'Modern Purple',
      category: 'Creative',
      preview: 'bg-gradient-to-br from-purple-600 to-pink-600',
      description: 'Bold and modern aesthetic'
    },
    {
      id: 'minimal-gray',
      name: 'Minimal Gray',
      category: 'Educational',
      preview: 'bg-gradient-to-br from-gray-600 to-gray-800',
      description: 'Clean and minimalist'
    },
    {
      id: 'corporate-green',
      name: 'Corporate Green',
      category: 'Business',
      preview: 'bg-gradient-to-br from-green-600 to-emerald-600',
      description: 'Corporate and trustworthy'
    }
  ];

  const audiences = [
    'Business professionals',
    'Entrepreneurs',
    'Students',
    'Job seekers',
    'Marketing managers',
    'Tech professionals'
  ];

  const generateCarousel = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedSlides: Slide[] = [
        {
          id: '1',
          title: topic,
          content: 'An essential guide for professionals',
          type: 'title'
        },
        {
          id: '2',
          title: 'The Challenge',
          content: 'Many professionals struggle with this common issue in their daily work.',
          type: 'content'
        },
        {
          id: '3',
          title: 'Key Insight #1',
          content: 'Understanding the fundamentals is crucial for success.',
          type: 'content'
        },
        {
          id: '4',
          title: 'Key Insight #2',
          content: 'Practical application makes all the difference.',
          type: 'content'
        },
        {
          id: '5',
          title: 'Key Insight #3',
          content: 'Consistency and persistence drive results.',
          type: 'content'
        },
        {
          id: '6',
          title: 'Take Action',
          content: 'Start implementing these insights today. What will you try first?',
          type: 'conclusion'
        }
      ];
      
      setSlides(generatedSlides);
      setCurrentSlide(0);
      
      // Generate flow score
      setTimeout(() => {
        setFlowScore(85);
      }, 500);
      
    } catch (error) {
      console.error('Error generating carousel:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: 'Add your content here...',
      type: 'content'
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = (slideId: string) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter(slide => slide.id !== slideId);
    setSlides(newSlides);
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(newSlides.length - 1);
    }
  };

  const updateSlide = (slideId: string, field: keyof Slide, value: string) => {
    setSlides(slides.map(slide => 
      slide.id === slideId ? { ...slide, [field]: value } : slide
    ));
  };

  const exportCarousel = () => {
    alert('Export functionality coming soon!');
  };

  const previewCarousel = () => {
    alert('Preview modal coming soon!');
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Image className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Carousel Maker</h1>
          <p className="text-gray-400 mt-1">Design professional multi-slide carousels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Creation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Generation Controls */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI Carousel Generation
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Topic
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., 5 Tips for Better Remote Work"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Audience
                  </label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    {audiences.map((audience) => (
                      <option key={audience} value={audience.toLowerCase()}>{audience}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Slides
                  </label>
                  <select
                    value={slideCount}
                    onChange={(e) => setSlideCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    {[5, 6, 7, 8, 9, 10].map((count) => (
                      <option key={count} value={count}>{count} slides</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={generateCarousel}
                disabled={!topic.trim() || isGenerating}
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
                    Generate Carousel
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Template Selection */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              Choose Template
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-full h-16 rounded-lg mb-3 ${template.preview}`}></div>
                  <h4 className="text-sm font-medium text-gray-50">{template.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Slide Editor */}
          {slides.length > 0 && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  <Type className="w-5 h-5 text-blue-400" />
                  Slide Editor
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-gray-300 text-sm px-3">
                    {currentSlide + 1} of {slides.length}
                  </span>
                  <button
                    onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                    disabled={currentSlide === slides.length - 1}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {currentSlideData && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Slide Title
                    </label>
                    <input
                      type="text"
                      value={currentSlideData.title}
                      onChange={(e) => updateSlide(currentSlideData.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Slide Content
                    </label>
                    <textarea
                      value={currentSlideData.content}
                      onChange={(e) => updateSlide(currentSlideData.id, 'content', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={addSlide}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Slide
                    </button>
                    
                    {slides.length > 1 && (
                      <button
                        onClick={() => deleteSlide(currentSlideData.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Slide
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          {slides.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={previewCarousel}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              
              <button
                onClick={exportCarousel}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Flow Score */}
          {flowScore !== null && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Flow Score
              </h3>
              
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold mb-2 ${
                  flowScore >= 80 ? 'text-green-400' : flowScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {flowScore}
                </div>
                <div className="text-gray-400">out of 100</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Structure</span>
                  <span className="text-green-400">Excellent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Engagement</span>
                  <span className="text-green-400">Very Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Call-to-Action</span>
                  <span className="text-yellow-400">Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Completeness</span>
                  <span className="text-green-400">Excellent</span>
                </div>
              </div>
            </div>
          )}

          {/* Slide Overview */}
          {slides.length > 0 && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Slide Overview</h3>
              <div className="space-y-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentSlide === index
                        ? 'bg-indigo-500/20 border border-indigo-500/30'
                        : 'bg-gray-700/30 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-50 text-sm">
                        Slide {index + 1}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        slide.type === 'title' ? 'bg-blue-500/20 text-blue-400' :
                        slide.type === 'conclusion' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {slide.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 truncate">
                      {slide.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Carousel Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Keep slide titles short and impactful</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Use 5-7 slides for optimal engagement</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">End with a clear call-to-action</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Maintain visual consistency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselMaker;

