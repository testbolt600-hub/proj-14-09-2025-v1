import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Building, 
  Upload, 
  Sparkles, 
  Download, 
  Copy, 
  Edit3,
  CheckCircle,
  AlertCircle,
  X,
  RefreshCw,
  Eye,
  Save
} from 'lucide-react';

interface AnalysisData {
  cvContent: string;
  jobDescription: string;
  companyInfo?: {
    name: string;
    industry: string;
    values: string[];
    culture: string;
  };
  jobTitle: string;
  keyRequirements: string[];
  matchingSkills: string[];
  gaps: string[];
}

const CoverLetterGenerator = () => {
  const [step, setStep] = useState<'upload' | 'input' | 'generate' | 'edit'>('upload');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvContent, setCvContent] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [editedCoverLetter, setEditedCoverLetter] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Please select a valid file type (PDF, DOCX, DOC, or TXT)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size must be less than 10MB');
        return;
      }
      
      setCvFile(file);
      setUploadError('');
      
      // Simulate CV content extraction
      const mockCvContent = `JOHN DOE
Software Engineer
john.doe@email.com | (555) 123-4567

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-impact solutions.

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2022-Present
• Led development of microservices architecture serving 100K+ users
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored 3 junior developers and conducted code reviews

Software Engineer | StartupXYZ | 2020-2022
• Built responsive web applications using React and Node.js
• Optimized database queries improving application performance by 40%

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2016-2020

SKILLS
React, TypeScript, Node.js, Python, AWS, Docker, PostgreSQL`;
      
      setCvContent(mockCvContent);
      setStep('input');
    }
  };

  const analyzeInputs = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate API analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis: AnalysisData = {
        cvContent,
        jobDescription,
        companyInfo: companyUrl ? {
          name: 'TechCorp Inc.',
          industry: 'Technology',
          values: ['Innovation', 'Collaboration', 'Excellence'],
          culture: 'Fast-paced, collaborative environment focused on cutting-edge technology'
        } : undefined,
        jobTitle: 'Senior Software Engineer',
        keyRequirements: [
          'React.js and TypeScript experience',
          '5+ years of software development',
          'API design and development',
          'Team leadership experience',
          'Cloud platforms (AWS/Azure)'
        ],
        matchingSkills: [
          'React and TypeScript',
          '5+ years experience',
          'Team leadership',
          'AWS experience'
        ],
        gaps: [
          'No explicit Azure experience mentioned'
        ]
      };
      
      setAnalysisData(mockAnalysis);
      setStep('generate');
    } catch (error) {
      console.error('Error analyzing inputs:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateCoverLetter = async () => {
    if (!analysisData) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at ${analysisData.companyInfo?.name || 'your company'}. With over 5 years of experience in software development and a proven track record of leading high-impact projects, I am excited about the opportunity to contribute to your team's continued success.

In my current role as Senior Software Engineer at TechCorp Inc., I have successfully led the development of microservices architecture serving over 100,000 users, directly aligning with your need for scalable system design. My expertise in React.js and TypeScript, combined with my experience in API design and development, positions me well to tackle the technical challenges outlined in your job description.

What particularly excites me about this opportunity is ${analysisData.companyInfo?.name || 'your company'}'s commitment to ${analysisData.companyInfo?.values[0] || 'innovation'}. This aligns perfectly with my passion for implementing cutting-edge solutions, as demonstrated by my work in reducing deployment time by 60% through CI/CD pipeline implementation.

Key highlights of my experience that directly match your requirements:

• **React & TypeScript Expertise**: 5+ years of hands-on experience building responsive web applications
• **Team Leadership**: Successfully mentored 3 junior developers and conducted comprehensive code reviews
• **Cloud Technologies**: Extensive experience with AWS, with growing familiarity in Azure platforms
• **Performance Optimization**: Achieved 40% improvement in application performance through database query optimization

I am particularly drawn to ${analysisData.companyInfo?.name || 'your company'} because of your reputation for ${analysisData.companyInfo?.culture || 'fostering innovation and technical excellence'}. I am confident that my technical skills, leadership experience, and passion for continuous learning would make me a valuable addition to your engineering team.

I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to your team's objectives. Thank you for considering my application, and I look forward to hearing from you soon.

Best regards,
John Doe`;

      setGeneratedCoverLetter(mockCoverLetter);
      setEditedCoverLetter(mockCoverLetter);
      setStep('edit');
    } catch (error) {
      console.error('Error generating cover letter:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedCoverLetter);
    // You could add a toast notification here
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([editedCoverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${analysisData?.jobTitle?.replace(/\s+/g, '-').toLowerCase() || 'generated'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetProcess = () => {
    setStep('upload');
    setCvFile(null);
    setCvContent('');
    setCompanyUrl('');
    setJobDescription('');
    setAnalysisData(null);
    setGeneratedCoverLetter('');
    setEditedCoverLetter('');
    setUploadError('');
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Cover Letter Generator</h1>
            <p className="text-gray-400 mt-1">AI-powered personalized cover letters</p>
          </div>
        </div>
        
        {step !== 'upload' && (
          <button
            onClick={resetProcess}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Progress</span>
          <span className="text-sm text-gray-400">
            Step {step === 'upload' ? 1 : step === 'input' ? 2 : step === 'generate' ? 3 : 4} of 4
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: step === 'upload' ? '25%' : 
                     step === 'input' ? '50%' : 
                     step === 'generate' ? '75%' : '100%' 
            }}
          ></div>
        </div>
      </div>

      {/* Step 1: CV Upload */}
      {step === 'upload' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-50 mb-6 text-center">Upload Your CV/Resume</h3>
            
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-gray-500 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-50 mb-2">
                    {cvFile ? cvFile.name : 'Choose your CV/Resume'}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {cvFile ? 
                      `${(cvFile.size / 1024 / 1024).toFixed(2)} MB • Ready to proceed` :
                      'PDF, DOCX, DOC, or TXT (Max 10MB)'
                    }
                  </p>
                </div>
                
                {!cvFile ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    Select File
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Change File
                    </button>
                    <button
                      onClick={() => setStep('input')}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                    >
                      Continue
                    </button>
                  </div>
                )}
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

            <div className="mt-6 bg-slate-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">Supported Formats</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div>• PDF (.pdf)</div>
                <div>• Word (.docx)</div>
                <div>• Word (.doc)</div>
                <div>• Text (.txt)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Job Information Input */}
      {step === 'input' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-400" />
                Company Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Website or Job Posting URL (Optional)
                </label>
                <input
                  type="url"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  placeholder="https://company.com or job posting URL"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  AI will analyze company culture and values for better personalization
                </p>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Job Description
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Complete Job Posting
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  rows={12}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">
                    Include job title, requirements, responsibilities, and company information
                  </p>
                  <span className="text-xs text-gray-400">
                    {jobDescription.length} characters
                  </span>
                </div>
              </div>

              <button
                onClick={analyzeInputs}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze & Continue
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">CV Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">CV uploaded successfully</span>
                </div>
                <div className="text-sm text-gray-400">
                  <strong className="text-gray-300">File:</strong> {cvFile?.name}
                </div>
                <div className="text-sm text-gray-400">
                  <strong className="text-gray-300">Size:</strong> {cvFile ? (cvFile.size / 1024 / 1024).toFixed(2) : '0'} MB
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Tips for Best Results</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Include the complete job posting for better analysis</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Company URL helps personalize the letter</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">More details = better customization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Analysis & Generation */}
      {step === 'generate' && analysisData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Analysis Complete - Ready to Generate
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#1F2937] rounded-lg p-4">
                  <h4 className="font-medium text-gray-50 mb-3">Matching Skills</h4>
                  <div className="space-y-2">
                    {analysisData.matchingSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1F2937] rounded-lg p-4">
                  <h4 className="font-medium text-gray-50 mb-3">Areas to Address</h4>
                  <div className="space-y-2">
                    {analysisData.gaps.map((gap, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300 text-sm">{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {analysisData.companyInfo && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-400 mb-2">Company Insights</h4>
                  <div className="text-sm text-gray-300">
                    <p><strong>Industry:</strong> {analysisData.companyInfo.industry}</p>
                    <p><strong>Values:</strong> {analysisData.companyInfo.values.join(', ')}</p>
                    <p><strong>Culture:</strong> {analysisData.companyInfo.culture}</p>
                  </div>
                </div>
              )}

              <button
                onClick={generateCoverLetter}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    Generating Your Cover Letter...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Generate Cover Letter
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Job Analysis</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-300">Position:</span>
                  <p className="text-gray-50">{analysisData.jobTitle}</p>
                </div>
                {analysisData.companyInfo && (
                  <div>
                    <span className="text-sm font-medium text-gray-300">Company:</span>
                    <p className="text-gray-50">{analysisData.companyInfo.name}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-gray-300">Key Requirements:</span>
                  <div className="mt-1 space-y-1">
                    {analysisData.keyRequirements.slice(0, 3).map((req, index) => (
                      <p key={index} className="text-gray-300 text-sm">• {req}</p>
                    ))}
                    {analysisData.keyRequirements.length > 3 && (
                      <p className="text-gray-400 text-xs">+{analysisData.keyRequirements.length - 3} more</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">What AI Will Include</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Personalized opening addressing the specific role</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Relevant experience highlighting from your CV</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Company-specific cultural alignment</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Strategic gap addressing</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Professional closing with clear next steps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Edit Generated Cover Letter */}
      {step === 'edit' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-emerald-400" />
                  Your Personalized Cover Letter
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    {showPreview ? 'Edit' : 'Preview'}
                  </button>
                </div>
              </div>
              
              {showPreview ? (
                <div className="bg-white rounded-lg p-6 text-gray-800 min-h-96">
                  <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                    {editedCoverLetter}
                  </pre>
                </div>
              ) : (
                <textarea
                  value={editedCoverLetter}
                  onChange={(e) => setEditedCoverLetter(e.target.value)}
                  className="w-full h-96 px-4 py-3 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none font-mono text-sm leading-relaxed"
                />
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Copy to Clipboard
                </button>
                
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download as TXT
                </button>
                
                <button
                  onClick={() => {
                    // Simulate PDF download
                    alert('PDF download feature coming soon!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download as PDF
                </button>

                <button
                  onClick={() => {
                    // Simulate save to drafts
                    alert('Cover letter saved to drafts!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Cover Letter Quality</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">94%</div>
                  <div className="text-gray-400 text-sm">Quality Score</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Personalization</span>
                    <span className="text-emerald-400">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Skill Alignment</span>
                    <span className="text-emerald-400">Very Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Company Fit</span>
                    <span className="text-emerald-400">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Professional Tone</span>
                    <span className="text-emerald-400">Perfect</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Customization Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Add specific examples from your experience</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Mention the hiring manager's name if known</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Reference recent company news or achievements</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Keep it concise - aim for one page</p>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setStep('input')}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  Edit job description
                </button>
                <button
                  onClick={() => generateCoverLetter()}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  Regenerate with different approach
                </button>
                <button
                  onClick={() => setStep('upload')}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  Use different CV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGenerator;