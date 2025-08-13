import React, { useState } from 'react';
import { 
  Target, 
  FileText, 
  Sparkles, 
  Download, 
  Eye,
  Building,
  User,
  BarChart3,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

const ApplicationTailor = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [selectedResume, setSelectedResume] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [tailoredContent, setTailoredContent] = useState<any>(null);

  const resumes = [
    { id: '1', name: 'Software Engineer Resume', lastModified: '2024-01-15' },
    { id: '2', name: 'Product Manager Resume', lastModified: '2024-01-10' },
    { id: '3', name: 'General Tech Resume', lastModified: '2024-01-05' }
  ];

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis = {
        jobTitle: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        keyRequirements: [
          'React.js and TypeScript experience',
          '5+ years of software development',
          'API design and development',
          'Agile/Scrum methodologies',
          'Team leadership experience'
        ],
        preferredSkills: [
          'Node.js backend development',
          'Cloud platforms (AWS/Azure)',
          'GraphQL',
          'Microservices architecture'
        ],
        matchScore: 78,
        gaps: [
          'No explicit GraphQL experience mentioned',
          'Limited cloud platform experience'
        ]
      };
      
      setAnalysis(mockAnalysis);
      
      // Generate tailored content
      const mockTailored = {
        professionalSummary: "Senior Software Engineer with 5+ years of experience developing scalable web applications using React.js, TypeScript, and Node.js. Proven track record in API design, Agile methodologies, and leading development teams to deliver high-quality solutions.",
        keyAchievements: [
          "Led a team of 4 developers to build a React-based dashboard that improved user engagement by 40%",
          "Designed and implemented RESTful APIs serving 10M+ requests daily with 99.9% uptime",
          "Implemented Agile practices that reduced sprint delivery time by 25%"
        ],
        coverLetter: "Dear Hiring Manager,\n\nI am excited to apply for the Senior Software Engineer position at TechCorp Inc. With over 5 years of experience in React.js and TypeScript development, I am confident I can contribute to your team's success...",
        interviewPrep: [
          "How do you approach API design for scalability?",
          "Describe your experience with Agile methodologies",
          "Tell me about a time you led a technical team"
        ]
      };
      
      setTailoredContent(mockTailored);
    } catch (error) {
      console.error('Error analyzing job:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Application Tailor</h1>
          <p className="text-gray-400 mt-1">Customize applications for specific job postings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description Input */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Job Description
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Website (Optional)
                </label>
                <input
                  type="url"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Job Posting
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  rows={10}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={analyzeJob}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing Job...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze & Tailor
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Base Resume Selection */}
          {analysis && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Select Base Resume
              </h3>
              
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <button
                    key={resume.id}
                    onClick={() => setSelectedResume(resume.id)}
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                      selectedResume === resume.id
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-50">{resume.name}</h4>
                        <p className="text-sm text-gray-400 mt-1">Last modified: {resume.lastModified}</p>
                      </div>
                      {selectedResume === resume.id && (
                        <CheckCircle className="w-5 h-5 text-indigo-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tailored Content */}
          {tailoredContent && (
            <div className="space-y-6">
              {/* Professional Summary */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-4">Tailored Professional Summary</h3>
                <div className="bg-[#1F2937] rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">{tailoredContent.professionalSummary}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                    Edit
                  </button>
                  <button className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Key Achievements */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-4">Enhanced Achievements</h3>
                <div className="space-y-3">
                  {tailoredContent.keyAchievements.map((achievement: string, index: number) => (
                    <div key={index} className="bg-[#1F2937] rounded-lg p-4">
                      <p className="text-gray-300">• {achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover Letter */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-4">Generated Cover Letter</h3>
                <div className="bg-[#1F2937] rounded-lg p-4">
                  <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {tailoredContent.coverLetter}
                  </pre>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Final Actions */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-4">Export Application Package</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    <Download className="w-4 h-4" />
                    Download Cover Letter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                    <Download className="w-4 h-4" />
                    Download Package
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Analysis */}
          {analysis && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-400" />
                Job Analysis
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-50 mb-2">{analysis.jobTitle}</h4>
                  <p className="text-gray-400 text-sm">{analysis.company}</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">{analysis.matchScore}%</div>
                  <div className="text-gray-400 text-sm">Match Score</div>
                </div>
              </div>
            </div>
          )}

          {/* Key Requirements */}
          {analysis && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Key Requirements</h3>
              <div className="space-y-2">
                {analysis.keyRequirements.map((req: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interview Prep */}
          {tailoredContent && (
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Interview Prep</h3>
              <div className="space-y-3">
                {tailoredContent.interviewPrep.map((question: string, index: number) => (
                  <div key={index} className="p-3 bg-[#1F2937] rounded-lg">
                    <p className="text-gray-300 text-sm">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-4">Tailoring Tips</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Mirror the job posting's language</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Highlight relevant achievements</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Address potential skill gaps</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Research company culture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTailor;

