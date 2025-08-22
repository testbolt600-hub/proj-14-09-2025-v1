import React, { useState, useRef } from 'react';
import { 
  Target, 
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
  Save,
  FileText,
  RotateCcw
} from 'lucide-react';
import ResumePreview from './ResumePreview';
import AICopilot from './AICopilot';

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

interface FormattingSettings {
  fontStyle: string;
  fontSize: number;
  headingSize: number;
  sectionSpacing: number;
  paragraphSpacing: number;
  lineSpacing: number;
  topBottomMargin: number;
  sideMargins: number;
  paragraphIndent: number;
}

const ApplicationTailor = () => {
  const [step, setStep] = useState<'upload' | 'input' | 'generate' | 'edit'>('upload');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvContent, setCvContent] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [generatedResume, setGeneratedResume] = useState('');
  const [editedResume, setEditedResume] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('classic-1');
  const [selectedColors, setSelectedColors] = useState({
    primary: '#3B82F6',
    secondary: '#64748B',
    accent: '#8B5CF6'
  });
  const [formattingSettings, setFormattingSettings] = useState<FormattingSettings>({
    fontStyle: 'Inter',
    fontSize: 11,
    headingSize: 14,
    sectionSpacing: 16,
    paragraphSpacing: 8,
    lineSpacing: 1.4,
    topBottomMargin: 20,
    sideMargins: 20,
    paragraphIndent: 0
  });
  const [activeSections, setActiveSections] = useState<string[]>([
    'Heading',
    'Profile',
    'Core Skills',
    'Experience',
    'Education'
  ]);
  const [activeTab, setActiveTab] = useState<'design' | 'formatting' | 'sections' | 'ai'>('design');
  const [templateCategory, setTemplateCategory] = useState<'all' | 'classic' | 'photo' | 'modern'>('all');
  const [selectedText, setSelectedText] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [undoHistory, setUndoHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [showExportModal, setShowExportModal] = useState(false);
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

  const generateTailoredResume = async () => {
    if (!analysisData) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockTailoredResume = `JOHN DOE
Senior Software Engineer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Results-driven Senior Software Engineer with 5+ years of experience developing scalable web applications using React.js, TypeScript, and cloud technologies. Proven expertise in API design, team leadership, and delivering high-impact solutions in fast-paced environments. Strong background in AWS cloud platforms with growing Azure experience.

CORE SKILLS
• Frontend Development: React.js, TypeScript, JavaScript, HTML5, CSS3, Next.js
• Backend Development: Node.js, Python, Express.js, RESTful API Design
• Cloud Platforms: AWS (Expert), Azure (Familiar), Docker, Kubernetes
• Database Technologies: PostgreSQL, MongoDB, Redis
• Development Tools: Git, Jenkins, CI/CD Pipelines, Jira
• Leadership: Team Mentoring, Code Reviews, Agile/Scrum Methodologies

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2022-Present
• Architected and led development of microservices architecture serving 100K+ active users
• Designed and implemented RESTful APIs handling 1M+ daily requests with 99.9% uptime
• Implemented comprehensive CI/CD pipelines reducing deployment time by 60% and eliminating manual errors
• Led cross-functional team of 8 developers, conducting code reviews and mentoring 3 junior developers
• Collaborated closely with product management team to define technical requirements and delivery timelines
• Utilized AWS cloud services including EC2, S3, RDS, and Lambda for scalable infrastructure

Software Engineer | StartupXYZ | 2020-2022
• Built responsive web applications using React.js, TypeScript, and Node.js serving 50K+ users
• Optimized database queries and application performance resulting in 40% improvement in load times
• Integrated third-party APIs and payment processing systems (Stripe, PayPal) handling $2M+ transactions
• Participated in agile development cycles, sprint planning, and daily standups
• Developed automated testing suites achieving 90% code coverage

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2016-2020
GPA: 3.8/4.0
Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems

CERTIFICATIONS & TRAINING
• AWS Certified Solutions Architect - Associate (2023)
• Certified Scrum Master (CSM) - Scrum Alliance (2022)
• Azure Fundamentals (AZ-900) - In Progress (Expected: March 2024)

PROJECTS
• E-commerce Platform: Led development of React/Node.js platform processing 10K+ orders monthly
• API Gateway: Designed microservices API gateway handling 500+ endpoints with rate limiting
• Performance Optimization: Reduced application bundle size by 45% through code splitting and optimization`;

      setGeneratedResume(mockTailoredResume);
      setEditedResume(mockTailoredResume);
      setUndoHistory([mockTailoredResume]);
      setHistoryPointer(0);
      setStep('edit');
    } catch (error) {
      console.error('Error generating tailored resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    if (newContent !== editedResume) {
      const newHistory = undoHistory.slice(0, historyPointer + 1);
      newHistory.push(newContent);
      setUndoHistory(newHistory);
      setHistoryPointer(newHistory.length - 1);
      setEditedResume(newContent);
    }
  };

  const handleUndo = () => {
    if (historyPointer > 0) {
      setHistoryPointer(historyPointer - 1);
      setEditedResume(undoHistory[historyPointer - 1]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedResume);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([editedResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `tailored-resume-${analysisData?.jobTitle?.replace(/\s+/g, '-').toLowerCase() || 'generated'}.txt`;
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
    setGeneratedResume('');
    setEditedResume('');
    setUploadError('');
  };

  const handleAddSection = (sectionName: string) => {
    if (!activeSections.includes(sectionName)) {
      setActiveSections([...activeSections, sectionName]);
    }
  };

  const handleDeleteSection = (sectionName: string) => {
    setActiveSections(activeSections.filter(section => section !== sectionName));
  };

  const handleATSOptimization = async () => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiProcessing(false);
  };

  const handleEnhanceText = async () => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiProcessing(false);
  };

  const handleGapJustification = async () => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiProcessing(false);
  };

  // Design & Formatting Controls
  const colorPalettes = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#64748B', accent: '#8B5CF6' },
    { name: 'Green', primary: '#10B981', secondary: '#64748B', accent: '#F59E0B' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#64748B', accent: '#EF4444' },
    { name: 'Orange', primary: '#F97316', secondary: '#64748B', accent: '#06B6D4' },
    { name: 'Red', primary: '#EF4444', secondary: '#64748B', accent: '#10B981' },
    { name: 'Teal', primary: '#14B8A6', secondary: '#64748B', accent: '#F59E0B' },
    { name: 'Indigo', primary: '#6366F1', secondary: '#64748B', accent: '#EC4899' },
    { name: 'Gray', primary: '#6B7280', secondary: '#9CA3AF', accent: '#3B82F6' }
  ];

  const templates = [
    // Classic Templates
    { id: 'classic-1', name: 'Professional Classic', category: 'classic', preview: 'bg-white border-2 border-gray-300', description: 'Traditional professional layout' },
    { id: 'classic-2', name: 'Executive Classic', category: 'classic', preview: 'bg-gray-50 border-2 border-gray-400', description: 'Executive-level traditional design' },
    { id: 'classic-3', name: 'Academic Classic', category: 'classic', preview: 'bg-white border-2 border-blue-300', description: 'Academic and research focused' },
    { id: 'classic-4', name: 'Corporate Classic', category: 'classic', preview: 'bg-blue-50 border-2 border-blue-400', description: 'Corporate environment optimized' },
    { id: 'classic-5', name: 'Minimal Classic', category: 'classic', preview: 'bg-white border border-gray-200', description: 'Clean minimal approach' },
    
    // Photo Templates
    { id: 'photo-1', name: 'Professional Photo', category: 'photo', preview: 'bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300', description: 'Photo-centric professional' },
    { id: 'photo-2', name: 'Creative Photo', category: 'photo', preview: 'bg-gradient-to-r from-purple-100 to-pink-200 border-2 border-purple-300', description: 'Creative industries focused' },
    { id: 'photo-3', name: 'Executive Photo', category: 'photo', preview: 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-400', description: 'Executive with photo' },
    { id: 'photo-4', name: 'Modern Photo', category: 'photo', preview: 'bg-gradient-to-r from-green-100 to-teal-200 border-2 border-green-300', description: 'Modern photo layout' },
    { id: 'photo-5', name: 'Artistic Photo', category: 'photo', preview: 'bg-gradient-to-r from-orange-100 to-red-200 border-2 border-orange-300', description: 'Artistic and creative' },
    
    // Modern Templates
    { id: 'modern-1', name: 'Tech Modern', category: 'modern', preview: 'bg-gradient-to-br from-indigo-500 to-purple-600', description: 'Technology industry modern' },
    { id: 'modern-2', name: 'Creative Modern', category: 'modern', preview: 'bg-gradient-to-br from-pink-500 to-rose-600', description: 'Creative and bold design' },
    { id: 'modern-3', name: 'Business Modern', category: 'modern', preview: 'bg-gradient-to-br from-blue-500 to-cyan-600', description: 'Modern business approach' },
    { id: 'modern-4', name: 'Startup Modern', category: 'modern', preview: 'bg-gradient-to-br from-green-500 to-emerald-600', description: 'Startup environment focused' },
    { id: 'modern-5', name: 'Minimalist Modern', category: 'modern', preview: 'bg-gradient-to-br from-gray-500 to-slate-600', description: 'Ultra-modern minimal' }
  ];

  const availableSections = [
    'Heading',
    'Profile',
    'Core Skills',
    'Experience',
    'Education',
    'Initiatives Accomplishments',
    'Rewards Recognition',
    'Online Courses Certifications',
    'Activities',
    'Awards, Accomplishments, and Honors',
    'Certifications and Licenses',
    'Languages',
    'References',
    'Add Your Own'
  ];

  const fontStyles = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Source Sans Pro', 'Century Gothic'
  ];

  const filteredTemplates = templateCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === templateCategory);

  const updateFormatting = (key: keyof FormattingSettings, value: number | string) => {
    setFormattingSettings({
      ...formattingSettings,
      [key]: value
    });
  };

  const getStatusIcon = () => {
    return <Target className="w-6 h-6 text-orange-500" />;
  };

  const getStatusText = () => {
    return 'Select a file to import';
  };

  // Create mock active resume for AI Copilot
  const mockActiveResume = editedResume ? {
    id: 'tailored-resume',
    title: `Tailored Resume - ${analysisData?.jobTitle || 'Generated'}`,
    type: 'campaign' as const,
    content: editedResume,
    atsScore: 88,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  } : null;

  return (
    <div className="min-h-screen bg-slate-950">
      {step !== 'edit' ? (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-50">Application Tailor</h1>
                <p className="text-gray-400 mt-1">Create job-specific tailored resumes</p>
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
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
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
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
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
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
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
                          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
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
                      className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
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
                      className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none resize-none"
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
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Include the complete job posting for better analysis</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Company URL helps personalize the resume</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
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
                    <Sparkles className="w-5 h-5 text-orange-400" />
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
                    onClick={generateTailoredResume}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        Generating Your Tailored Resume...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        Generate Tailored Resume
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
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Keyword optimization for ATS systems</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Relevant experience highlighting</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Skills prioritization based on job requirements</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Professional summary optimization</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Achievement quantification and impact enhancement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Step 4: Resume Editor (Similar to Smart Resume Studio) */
        <div className="flex h-screen bg-slate-950">
          {/* Center Panel - Controls */}
          <div className="w-80 bg-slate-900 border-r border-slate-800 flex-shrink-0 border-l border-slate-800">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Application Tailor</h2>
                    <p className="text-xs text-slate-400">Job-Specific Resume Editor</p>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="grid grid-cols-2 gap-1 bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('design')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'design' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Design
                  </button>
                  <button
                    onClick={() => setActiveTab('formatting')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'formatting' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Formatting
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1 bg-slate-800 rounded-lg p-1 mt-2">
                  <button
                    onClick={() => setActiveTab('sections')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'sections' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Resume Sections
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'ai' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    AI Copilot
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'design' && (
                  <div className="space-y-6">
                    {/* Colors */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Colors</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {colorPalettes.map((palette) => (
                          <button
                            key={palette.name}
                            onClick={() => setSelectedColors(palette)}
                            className={`w-12 h-12 rounded-lg border-2 transition-all ${
                              selectedColors.primary === palette.primary
                                ? 'border-white scale-110'
                                : 'border-slate-600 hover:border-slate-500'
                            }`}
                            style={{ backgroundColor: palette.primary }}
                            title={palette.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Templates */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Templates</h4>
                      
                      {/* Template Categories */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        <button
                          onClick={() => setTemplateCategory('all')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            templateCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setTemplateCategory('classic')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            templateCategory === 'classic' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          Classic
                        </button>
                        <button
                          onClick={() => setTemplateCategory('photo')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            templateCategory === 'photo' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          Photo
                        </button>
                        <button
                          onClick={() => setTemplateCategory('modern')}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            templateCategory === 'modern' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          Modern
                        </button>
                      </div>

                      {/* Template Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {filteredTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setSelectedTemplateId(template.id)}
                            className={`p-2 rounded-lg border transition-all ${
                              selectedTemplateId === template.id
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-slate-600 hover:border-slate-500'
                            }`}
                          >
                            <div className={`w-full h-20 rounded mb-2 ${template.preview}`}></div>
                            <h5 className="text-xs font-medium text-white">{template.name}</h5>
                            <p className="text-xs text-slate-400 mt-1">{template.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'formatting' && (
                  <div className="space-y-6">
                    {/* Font Formatting */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Font Formatting</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Font Style</label>
                          <select
                            value={formattingSettings.fontStyle}
                            onChange={(e) => updateFormatting('fontStyle', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:border-indigo-500 focus:outline-none"
                          >
                            {fontStyles.map((font) => (
                              <option key={font} value={font}>{font}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">
                            Font Size: {formattingSettings.fontSize}pt
                          </label>
                          <input
                            type="range"
                            min="8"
                            max="16"
                            value={formattingSettings.fontSize}
                            onChange={(e) => updateFormatting('fontSize', Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">
                            Heading Size: {formattingSettings.headingSize}pt
                          </label>
                          <input
                            type="range"
                            min="12"
                            max="20"
                            value={formattingSettings.headingSize}
                            onChange={(e) => updateFormatting('headingSize', Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Document Formatting */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Document Formatting</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Section Spacing</label>
                          <input
                            type="range"
                            min="8"
                            max="32"
                            value={formattingSettings.sectionSpacing}
                            onChange={(e) => updateFormatting('sectionSpacing', Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Paragraph Spacing</label>
                          <input
                            type="range"
                            min="4"
                            max="16"
                            value={formattingSettings.paragraphSpacing}
                            onChange={(e) => updateFormatting('paragraphSpacing', Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Line Spacing</label>
                          <input
                            type="range"
                            min="1"
                            max="2"
                            step="0.1"
                            value={formattingSettings.lineSpacing}
                            onChange={(e) => updateFormatting('lineSpacing', Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Top & Bottom Margin</label>
                          <input
                            type="range"
                            min="10"
                            max="40"
                            value={formattingSettings.topBottomMargin}
                            onChange={(e) => updateFormatting('topBottomMargin', Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Side Margins</label>
                          <input
                            type="range"
                            min="10"
                            max="40"
                            value={formattingSettings.sideMargins}
                            onChange={(e) => updateFormatting('sideMargins', Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">Paragraph Indent</label>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={formattingSettings.paragraphIndent}
                            onChange={(e) => updateFormatting('paragraphIndent', Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'sections' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-white mb-3">Resume Sections</h4>
                    
                    <div className="space-y-2">
                      {availableSections.map((section) => {
                        const isActive = activeSections.includes(section);
                        return (
                          <div
                            key={section}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                              isActive ? 'border-green-500 bg-green-500/10' : 'border-slate-600 bg-slate-700/30'
                            }`}
                          >
                            <span className={`text-sm ${isActive ? 'text-green-400' : 'text-slate-300'}`}>
                              {section}
                            </span>
                            {isActive ? (
                              <button
                                onClick={() => handleDeleteSection(section)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAddSection(section)}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <AICopilot
                    activeResume={mockActiveResume}
                    selectedText={selectedText}
                    aiProcessing={aiProcessing}
                    onATSOptimization={handleATSOptimization}
                    onEnhanceText={handleEnhanceText}
                    onGapJustification={handleGapJustification}
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-slate-800 space-y-2">
                <button 
                  onClick={resetProcess}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Start New Tailoring
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="flex-1 bg-slate-900 flex flex-col">
            {/* Header */}
            <div className="bg-slate-800 border-b border-slate-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    Tailored Resume - {analysisData?.jobTitle || 'Generated'}
                  </h3>
                  <div className="px-2 py-1 rounded-full text-xs font-medium text-orange-400 bg-orange-500/20">
                    ATS: 88%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUndo}
                    disabled={historyPointer <= 0}
                    className="flex items-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Undo
                  </button>
                  <button
                    onClick={() => {
                      // Simulate save
                      alert('Tailored resume saved successfully!');
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="flex-1 overflow-hidden">
              <ResumePreview
                content={editedResume}
                templateId={selectedTemplateId}
                colors={selectedColors}
                formatting={formattingSettings}
                activeSections={activeSections}
                onDeleteSection={handleDeleteSection}
              />
            </div>
          </div>

          {/* Export Modal */}
          {showExportModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-slate-800 rounded-lg p-6 w-96">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Export Tailored Resume</h3>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <p className="text-slate-300">Choose your preferred export format:</p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        handleDownload();
                        setShowExportModal(false);
                      }}
                      className="w-full flex items-center gap-3 p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Download as PDF</div>
                        <div className="text-sm opacity-80">Best for online applications</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        alert('Word document download started!');
                        setShowExportModal(false);
                      }}
                      className="w-full flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Download as Word</div>
                        <div className="text-sm opacity-80">Editable document format</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        handleCopy();
                        setShowExportModal(false);
                      }}
                      className="w-full flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">Copy to Clipboard</div>
                        <div className="text-sm opacity-80">Quick copy for pasting</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationTailor;