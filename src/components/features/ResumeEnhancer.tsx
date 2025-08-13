import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  BarChart3, 
  Download, 
  Eye,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Target
} from 'lucide-react';

const ResumeEnhancer = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [targetIndustry, setTargetIndustry] = useState('technology');
  const [targetRole, setTargetRole] = useState('software engineer');

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Marketing', 
    'Education', 'Consulting', 'Sales', 'Real Estate'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setAnalysis(null);
    }
  };

  const analyzeResume = async () => {
    if (!resumeFile) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAnalysis = {
        atsScore: 75,
        impactScore: 68,
        presentationScore: 82,
        alignmentScore: 71,
        overallScore: 74,
        issues: [
          { type: 'critical', message: 'ATS may have trouble parsing tables in experience section' },
          { type: 'warning', message: 'Missing quantifiable achievements in 3 bullet points' },
          { type: 'info', message: 'Consider adding more industry-specific keywords' }
        ],
        strengths: [
          'Clear contact information',
          'Consistent formatting',
          'Relevant technical skills listed',
          'Education section well-structured'
        ],
        suggestions: [
          'Replace table format with simple text in experience section',
          'Add specific metrics to achievement statements',
          'Include more keywords related to software development',
          'Consider reordering sections to prioritize experience'
        ]
      };
      
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Resume Enhancer</h1>
          <p className="text-gray-400 mt-1">Optimize your resume for ATS and recruiters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Section */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              Upload Resume
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Industry
                  </label>
                  <select
                    value={targetIndustry}
                    onChange={(e) => setTargetIndustry(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry.toLowerCase()}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Role
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 font-medium mb-2">
                    {resumeFile ? resumeFile.name : 'Upload your resume'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Supports PDF, DOC, and DOCX files
                  </p>
                </label>
              </div>

              <button
                onClick={analyzeResume}
                disabled={!resumeFile || isAnalyzing}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Analysis Results
              </h3>

              {/* Overall Score */}
              <div className="text-center mb-8">
                <div className={`text-5xl font-bold mb-2 ${getScoreColor(analysis.overallScore)}`}>
                  {analysis.overallScore}
                </div>
                <div className="text-gray-400">Overall Score (out of 100)</div>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className={`p-4 rounded-xl ${getScoreBg(analysis.atsScore)}`}>
                  <div className={`text-2xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                    {analysis.atsScore}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">ATS Compatible</div>
                </div>
                
                <div className={`p-4 rounded-xl ${getScoreBg(analysis.impactScore)}`}>
                  <div className={`text-2xl font-bold ${getScoreColor(analysis.impactScore)}`}>
                    {analysis.impactScore}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">Content Impact</div>
                </div>
                
                <div className={`p-4 rounded-xl ${getScoreBg(analysis.presentationScore)}`}>
                  <div className={`text-2xl font-bold ${getScoreColor(analysis.presentationScore)}`}>
                    {analysis.presentationScore}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">Presentation</div>
                </div>
                
                <div className={`p-4 rounded-xl ${getScoreBg(analysis.alignmentScore)}`}>
                  <div className={`text-2xl font-bold ${getScoreColor(analysis.alignmentScore)}`}>
                    {analysis.alignmentScore}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">Industry Fit</div>
                </div>
              </div>

              {/* Issues */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-50 mb-4">Issues Found</h4>
                <div className="space-y-3">
                  {analysis.issues.map((issue: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#1F2937]">
                      {issue.type === 'critical' && <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />}
                      {issue.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />}
                      {issue.type === 'info' && <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5" />}
                      <p className="text-gray-300">{issue.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-50 mb-4">Improvement Suggestions</h4>
                <div className="space-y-2">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-indigo-400 mt-1" />
                      <p className="text-gray-300">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Download Enhanced
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview Changes
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                  <Target className="w-4 h-4" />
                  Apply Template
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Strengths */}
          {analysis && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Strengths</h3>
              <div className="space-y-3">
                {analysis.strengths.map((strength: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Templates */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Resume Templates</h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-colors">
                <h4 className="font-medium text-gray-50 text-sm">Tech Professional</h4>
                <p className="text-xs text-gray-400 mt-1">Clean design for software engineers</p>
              </div>
              
              <div className="p-3 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-colors">
                <h4 className="font-medium text-gray-50 text-sm">Business Executive</h4>
                <p className="text-xs text-gray-400 mt-1">Conservative layout for senior roles</p>
              </div>
              
              <div className="p-3 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-colors">
                <h4 className="font-medium text-gray-50 text-sm">Creative Professional</h4>
                <p className="text-xs text-gray-400 mt-1">Modern design with visual elements</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">ATS Optimization Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Use standard section headings</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Include relevant keywords naturally</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Avoid complex formatting and graphics</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Quantify achievements with numbers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeEnhancer;

