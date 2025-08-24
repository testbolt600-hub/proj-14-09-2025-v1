import React, { useState } from 'react';
import { 
  TrendingUp, 
  Upload, 
  Link, 
  Github, 
  Globe, 
  Sparkles, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Target,
  BarChart3,
  User,
  FileText,
  ExternalLink,
  Star,
  ArrowRight,
  Zap
} from 'lucide-react';

interface BrandScore {
  overall: number;
  linkedin: number;
  resume: number;
  portfolio?: number;
  github?: number;
}

interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  example?: string;
}

const BrandAudit = () => {
  const [step, setStep] = useState<'input' | 'processing' | 'results'>('input');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [brandScore, setBrandScore] = useState<BrandScore | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [uploadError, setUploadError] = useState('');
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Please select a valid file type (PDF or DOCX)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }
      
      setResumeFile(file);
      setUploadError('');
    }
  };

  const startAudit = async () => {
    if (!resumeFile && !linkedinUrl.trim()) {
      setUploadError('Please provide at least a resume or LinkedIn profile');
      return;
    }

    setIsProcessing(true);
    setStep('processing');
    setProcessingProgress(0);

    const steps = [
      { text: 'Analyzing your resume content...', duration: 2000 },
      { text: 'Extracting LinkedIn profile data...', duration: 2500 },
      { text: 'Comparing against industry standards...', duration: 2000 },
      { text: 'Generating personalized recommendations...', duration: 3000 },
      { text: 'Finalizing your brand score...', duration: 1500 }
    ];

    let currentProgress = 0;
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(steps[i].text);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      currentProgress = ((i + 1) / steps.length) * 100;
      setProcessingProgress(currentProgress);
    }

    // Generate mock results
    const mockScore: BrandScore = {
      overall: 78,
      linkedin: 82,
      resume: 74,
      portfolio: portfolioUrl ? 85 : undefined,
      github: githubUrl ? 79 : undefined
    };

    const mockRecommendations: Recommendation[] = [
      {
        id: '1',
        priority: 'high',
        category: 'LinkedIn',
        title: 'Optimize Your LinkedIn Headline',
        description: 'Your current headline is too generic. Add specific skills and value proposition.',
        impact: '+15% profile views',
        difficulty: 'easy',
        example: 'Senior Software Engineer → Senior Software Engineer | React & Node.js Expert | Building Scalable Web Applications'
      },
      {
        id: '2',
        priority: 'high',
        category: 'Resume',
        title: 'Quantify Your Achievements',
        description: 'Add specific metrics and numbers to demonstrate impact.',
        impact: '+25% ATS score',
        difficulty: 'medium',
        example: 'Managed projects → Led 5 cross-functional projects, delivering $2M in cost savings'
      },
      {
        id: '3',
        priority: 'medium',
        category: 'LinkedIn',
        title: 'Add Industry Keywords',
        description: 'Include 8 missing keywords that recruiters search for in your field.',
        impact: '+20% recruiter discovery',
        difficulty: 'easy'
      },
      {
        id: '4',
        priority: 'medium',
        category: 'Resume',
        title: 'Improve Skills Section',
        description: 'Reorganize skills by relevance and add emerging technologies.',
        impact: '+12% match rate',
        difficulty: 'easy'
      },
      {
        id: '5',
        priority: 'low',
        category: 'Portfolio',
        title: 'Update Project Descriptions',
        description: 'Add business impact and technical challenges to project descriptions.',
        impact: '+18% engagement',
        difficulty: 'medium'
      }
    ];

    setBrandScore(mockScore);
    setRecommendations(mockRecommendations);
    setIsProcessing(false);
    setStep('results');
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
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">AI-Powered Personal Brand Audit</h1>
          <p className="text-gray-400 mt-1">Comprehensive analysis of your digital brand presence</p>
        </div>
      </div>

      {/* Step 1: Data Input */}
      {step === 'input' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Upload */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" />
                Upload Your Resume
              </h3>
              
              <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-gray-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-50 mb-2">
                      {resumeFile ? resumeFile.name : 'Drop your resume here'}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {resumeFile ? 
                        `${(resumeFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis` :
                        'PDF or DOCX format (Max 10MB)'
                      }
                    </p>
                  </div>
                  
                  <label
                    htmlFor="resume-upload"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer"
                  >
                    {resumeFile ? 'Change File' : 'Choose File'}
                  </label>
                </div>
              </div>

              {uploadError && (
                <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-red-400 text-sm">{uploadError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* LinkedIn Profile */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Link className="w-5 h-5 text-blue-400" />
                LinkedIn Profile
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  We'll analyze your headline, summary, experience, and engagement
                </p>
              </div>
            </div>

            {/* Optional Integrations */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" />
                Optional Integrations
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Github className="w-4 h-4 inline mr-2" />
                    GitHub Profile (Optional)
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Portfolio/Website (Optional)
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://yourportfolio.com"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={startAudit}
              disabled={(!resumeFile && !linkedinUrl.trim()) || isProcessing}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Start Brand Audit
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">What We Analyze</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-50 mb-1">LinkedIn Profile</h4>
                    <p className="text-gray-400 text-sm">Headline, summary, experience, skills, and engagement potential</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-50 mb-1">Resume Content</h4>
                    <p className="text-gray-400 text-sm">ATS compatibility, keyword optimization, and achievement impact</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Github className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-50 mb-1">GitHub Activity</h4>
                    <p className="text-gray-400 text-sm">Code quality, project presentation, and contribution patterns</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-orange-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-50 mb-1">Portfolio Site</h4>
                    <p className="text-gray-400 text-sm">Design quality, content organization, and professional presentation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Sample Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Your LinkedIn headline could be 40% more effective</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Missing 12 industry keywords recruiters search for</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Resume achievements need quantification</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Portfolio projects lack business context</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Privacy & Security</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Your data is encrypted and secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">No data stored after analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">GDPR compliant processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Processing */}
      {step === 'processing' && (
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-50 mb-2">Analyzing Your Brand</h3>
              <p className="text-gray-400">Our AI is examining your digital presence...</p>
            </div>

            <div className="mb-6">
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-300 font-medium">{processingStep}</p>
              <p className="text-gray-400 text-sm mt-2">{Math.round(processingProgress)}% complete</p>
            </div>

            <div className="bg-[#1F2937] rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-50 mb-3">Did You Know?</h4>
              <p className="text-gray-300 text-sm">
                Profiles with professional photos get 21x more views, and optimized headlines 
                increase recruiter discovery by 40%. We're analyzing these factors and more!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 'results' && brandScore && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Score */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Your Brand Score</h3>
              
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
                    <span className="text-gray-300">LinkedIn Profile</span>
                    <span className={`font-semibold ${getScoreColor(brandScore.linkedin)}`}>
                      {brandScore.linkedin}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Resume Quality</span>
                    <span className={`font-semibold ${getScoreColor(brandScore.resume)}`}>
                      {brandScore.resume}/100
                    </span>
                  </div>
                  {brandScore.github && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">GitHub Profile</span>
                      <span className={`font-semibold ${getScoreColor(brandScore.github)}`}>
                        {brandScore.github}/100
                      </span>
                    </div>
                  )}
                  {brandScore.portfolio && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Portfolio Site</span>
                      <span className={`font-semibold ${getScoreColor(brandScore.portfolio)}`}>
                        {brandScore.portfolio}/100
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">AI Recommendations</h3>
              
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-[#1F2937] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedRecommendation(rec)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                          {rec.priority} priority
                        </span>
                        <span className="text-gray-400 text-sm">{rec.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDifficultyIcon(rec.difficulty)}
                        <span className="text-gray-400 text-xs">{rec.difficulty}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-50 mb-2">{rec.title}</h4>
                    <p className="text-gray-300 text-sm mb-3">{rec.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-400 text-sm font-medium">
                        Expected Impact: {rec.impact}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => alert('PDF report download started!')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Report
              </button>
              
              <button
                onClick={() => setStep('input')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Run New Audit
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Wins</h3>
              <div className="space-y-3">
                {recommendations.filter(r => r.priority === 'high' && r.difficulty === 'easy').slice(0, 3).map((rec) => (
                  <div key={rec.id} className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="text-green-400 text-sm font-medium mb-1">{rec.title}</h4>
                    <p className="text-gray-300 text-xs">{rec.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Brand Archetype</h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-purple-400 mb-2">The Innovator</h4>
                <p className="text-gray-300 text-sm">
                  You're positioned as a forward-thinking professional who drives change and embraces new technologies.
                </p>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Industry Benchmark</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Your Score</span>
                  <span className="text-indigo-400 font-semibold">{brandScore.overall}/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Industry Average</span>
                  <span className="text-gray-400">64/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Top 10%</span>
                  <span className="text-green-400">85/100</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400 text-sm">
                  You're performing {brandScore.overall > 64 ? 'above' : 'below'} industry average. 
                  {brandScore.overall >= 85 ? ' You\'re in the top 10%!' : ` ${85 - brandScore.overall} points to reach top 10%.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendation Detail Modal */}
      {selectedRecommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">{selectedRecommendation.title}</h3>
              <button
                onClick={() => setSelectedRecommendation(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedRecommendation.priority)}`}>
                    {selectedRecommendation.priority} priority
                  </span>
                  <span className="text-gray-400">{selectedRecommendation.category}</span>
                  <div className="flex items-center gap-2">
                    {getDifficultyIcon(selectedRecommendation.difficulty)}
                    <span className="text-gray-400 text-sm">{selectedRecommendation.difficulty}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Description</h4>
                  <p className="text-gray-300">{selectedRecommendation.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Expected Impact</h4>
                  <p className="text-indigo-400 font-medium">{selectedRecommendation.impact}</p>
                </div>

                {selectedRecommendation.example && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Example</h4>
                    <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-300 text-sm">{selectedRecommendation.example}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                    Mark as Implemented
                  </button>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
                    Save for Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandAudit;