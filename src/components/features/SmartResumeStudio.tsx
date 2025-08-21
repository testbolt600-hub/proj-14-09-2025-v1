import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download,
  Save,
  Eye,
  RotateCcw,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import ResumeLibrary from './ResumeLibrary';
import DesignFormattingSidebar from './DesignFormattingSidebar';
import ResumePreview from './ResumePreview';
import ResumeListViewer from './ResumeListViewer';

interface Resume {
  id: string;
  title: string;
  type: 'master' | 'campaign';
  content: string;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
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

const SmartResumeStudio = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [activeResume, setActiveResume] = useState<Resume | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [viewMode, setViewMode] = useState<'edit' | 'manage'>('edit');
  const [isLoading, setIsLoading] = useState(false);
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
  const [undoHistory, setUndoHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [newResumeType, setNewResumeType] = useState<'master' | 'campaign'>('campaign');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [importError, setImportError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  useEffect(() => {
    const mockResumes: Resume[] = [
      {
        id: '1',
        title: 'Master Resume',
        type: 'master',
        content: `JOHN DOE
Software Engineer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-impact solutions.

CORE SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3
• Backend: Node.js, Python, Express.js, RESTful APIs
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes
• Tools: Git, Jenkins, Jira, Agile/Scrum

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2022-Present
• Led development of microservices architecture serving 100K+ users
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored 3 junior developers and conducted code reviews
• Collaborated with product team to define technical requirements

Software Engineer | StartupXYZ | 2020-2022
• Built responsive web applications using React and Node.js
• Optimized database queries improving application performance by 40%
• Integrated third-party APIs and payment processing systems
• Participated in agile development cycles and sprint planning

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2016-2020
GPA: 3.8/4.0

CERTIFICATIONS
• AWS Certified Solutions Architect
• Certified Scrum Master (CSM)`,
        atsScore: 85,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      {
        id: '2',
        title: 'Frontend Developer - Google',
        type: 'campaign',
        content: `JOHN DOE
Frontend Developer
john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Frontend-focused software engineer with expertise in React, TypeScript, and modern web development. Passionate about creating exceptional user experiences and optimizing web performance.

CORE SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Next.js
• UI/UX: Responsive Design, Accessibility, Performance Optimization
• Tools: Webpack, Vite, Jest, Cypress
• Design: Figma, Adobe Creative Suite

EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2022-Present
• Architected React-based frontend applications serving 100K+ users
• Optimized frontend performance resulting in 40% faster load times
• Led UI/UX improvements increasing user engagement by 25%
• Implemented accessibility standards achieving WCAG 2.1 compliance

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2016-2020`,
        atsScore: 92,
        createdAt: '2024-01-18',
        updatedAt: '2024-01-21'
      }
    ];
    setResumes(mockResumes);
    if (mockResumes.length > 0) {
      setActiveResumeId(mockResumes[0].id);
      setActiveResume(mockResumes[0]);
      setEditorContent(mockResumes[0].content);
      setUndoHistory([mockResumes[0].content]);
      setHistoryPointer(0);
    }
  }, []);

  const handleResumeSelect = (resumeId: string) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (resume) {
      setActiveResumeId(resumeId);
      setActiveResume(resume);
      setEditorContent(resume.content);
      setUndoHistory([resume.content]);
      setHistoryPointer(0);
      setViewMode('edit');
    }
  };

  const handleContentChange = (newContent: string) => {
    // Add current content to history before changing
    if (newContent !== editorContent) {
      const newHistory = undoHistory.slice(0, historyPointer + 1);
      newHistory.push(newContent);
      setUndoHistory(newHistory);
      setHistoryPointer(newHistory.length - 1);
      setEditorContent(newContent);
    }
  };

  const handleUndo = () => {
    if (historyPointer > 0) {
      setHistoryPointer(historyPointer - 1);
      setEditorContent(undoHistory[historyPointer - 1]);
    }
  };

  const handleSave = async () => {
    if (activeResume) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedResumes = resumes.map(r => 
        r.id === activeResume.id 
          ? { ...r, content: editorContent, updatedAt: new Date().toISOString() }
          : r
      );
      setResumes(updatedResumes);
      setActiveResume({ ...activeResume, content: editorContent, updatedAt: new Date().toISOString() });
      setIsLoading(false);
    }
  };

  const createNewResume = async () => {
    if (!newResumeTitle.trim()) return;
    
    const newResume: Resume = {
      id: Date.now().toString(),
      title: newResumeTitle,
      type: newResumeType,
      content: newResumeType === 'master' ? '' : resumes.find(r => r.type === 'master')?.content || '',
      atsScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setResumes([...resumes, newResume]);
    setActiveResumeId(newResume.id);
    setActiveResume(newResume);
    setEditorContent(newResume.content);
    setUndoHistory([newResume.content]);
    setHistoryPointer(0);
    setShowCreateModal(false);
    setNewResumeTitle('');
    setViewMode('edit');
  };

  const handleImportResume = () => {
    setShowImportModal(true);
    setImportFile(null);
    setImportStatus('idle');
    setImportError('');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setImportError('Please select a valid file type (PDF, DOCX, DOC, or TXT)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setImportError('File size must be less than 10MB');
        return;
      }
      
      setImportFile(file);
      setImportError('');
    }
  };

  const processImportedFile = async () => {
    if (!importFile) return;
    
    setImportStatus('uploading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setImportStatus('processing');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let extractedContent = '';
      if (importFile.type === 'text/plain') {
        extractedContent = await importFile.text();
      } else {
        extractedContent = `IMPORTED RESUME
${importFile.name.replace(/\.[^/.]+$/, '')}

PROFESSIONAL SUMMARY
[Content extracted from ${importFile.name}]

EXPERIENCE
[Experience section extracted]

EDUCATION
[Education section extracted]

SKILLS
[Skills section extracted]`;
      }
      
      const newResume: Resume = {
        id: Date.now().toString(),
        title: `Imported - ${importFile.name.replace(/\.[^/.]+$/, '')}`,
        type: 'master',
        content: extractedContent,
        atsScore: Math.floor(Math.random() * 30) + 60,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setResumes([...resumes, newResume]);
      setActiveResumeId(newResume.id);
      setActiveResume(newResume);
      setEditorContent(newResume.content);
      setUndoHistory([newResume.content]);
      setHistoryPointer(0);
      
      setImportStatus('success');
      
      setTimeout(() => {
        setShowImportModal(false);
        setImportFile(null);
        setImportStatus('idle');
        setImportError('');
        setViewMode('edit');
      }, 1500);
      
    } catch (error) {
      setImportStatus('error');
      setImportError('Failed to process the file. Please try again.');
    }
  };

  const handleAddSection = (sectionName: string) => {
    if (!activeSections.includes(sectionName)) {
      setActiveSections([...activeSections, sectionName]);
    }
  };

  const handleDeleteSection = (sectionName: string) => {
    setActiveSections(activeSections.filter(section => section !== sectionName));
  };

  const getStatusIcon = () => {
    switch (importStatus) {
      case 'uploading':
        return <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'processing':
        return <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <FileText className="w-6 h-6 text-blue-500" />;
    }
  };

  const getStatusText = () => {
    switch (importStatus) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing resume content...';
      case 'success':
        return 'Resume imported successfully!';
      case 'error':
        return 'Import failed';
      default:
        return 'Select a file to import';
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Left Panel - Resume Library */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
        <ResumeLibrary
          resumes={resumes}
          activeResumeId={activeResumeId}
          onSelectResume={handleResumeSelect}
        />
      </div>

      {/* Center Panel - Editor/List Viewer */}
      <div className="flex-1 bg-slate-900 flex flex-col">
        {/* Editor Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">
                {activeResume?.title || 'Select a Resume'}
              </h3>
              {activeResume && (
                <div className="px-2 py-1 rounded-full text-xs font-medium text-blue-400 bg-blue-500/20">
                  ATS: {activeResume.atsScore}%
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'edit' ? 'manage' : 'edit')}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                {viewMode === 'edit' ? 'Manage CVs' : 'Back to Editor'}
              </button>
              <button
                onClick={handleUndo}
                disabled={historyPointer <= 0}
                className="flex items-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-4 h-4" />
                Undo
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading || viewMode === 'manage'}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                disabled={!activeResume || viewMode === 'manage'}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'edit' ? (
            <div className="flex h-full">
              {/* Editor */}
              <div className="w-1/2 p-6 border-r border-slate-800">
                {activeResume ? (
                  <textarea
                    value={editorContent}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="w-full h-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-400 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-mono text-sm leading-relaxed"
                    placeholder="Start writing your resume content here..."
                  />
                ) : (
                  <div className="flex-1 flex items-center justify-center h-full">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Welcome to Smart Resume Studio
                      </h3>
                      <p className="text-slate-400 max-w-md">
                        Select a resume from the library or create a new one to get started.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resume Preview */}
              <div className="w-1/2">
                <ResumePreview
                  content={editorContent}
                  templateId={selectedTemplateId}
                  colors={selectedColors}
                  formatting={formattingSettings}
                  activeSections={activeSections}
                  onDeleteSection={handleDeleteSection}
                />
              </div>
            </div>
          ) : (
            <ResumeListViewer resumes={resumes} onSelectResume={handleResumeSelect} />
          )}
        </div>
      </div>

      {/* Right Panel - Design & Formatting Sidebar */}
      <DesignFormattingSidebar
        selectedTemplateId={selectedTemplateId}
        onTemplateSelect={setSelectedTemplateId}
        selectedColors={selectedColors}
        onColorsChange={setSelectedColors}
        formattingSettings={formattingSettings}
        onFormattingChange={setFormattingSettings}
        activeSections={activeSections}
        onAddSection={handleAddSection}
        onDeleteSection={handleDeleteSection}
        onCreateNew={() => setShowCreateModal(true)}
        onImportResume={handleImportResume}
      />

      {/* Create New Resume Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Resume</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Resume Title</label>
                <input
                  type="text"
                  value={newResumeTitle}
                  onChange={(e) => setNewResumeTitle(e.target.value)}
                  placeholder="e.g., Software Engineer - Google"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Resume Type</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-slate-500">
                    <input
                      type="radio"
                      name="resumeType"
                      value="campaign"
                      checked={newResumeType === 'campaign'}
                      onChange={(e) => setNewResumeType(e.target.value as 'master' | 'campaign')}
                      className="text-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-white">Campaign Resume</div>
                      <div className="text-xs text-slate-400">Job-specific tailored resume</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-slate-600 rounded-lg cursor-pointer hover:border-slate-500">
                    <input
                      type="radio"
                      name="resumeType"
                      value="master"
                      checked={newResumeType === 'master'}
                      onChange={(e) => setNewResumeType(e.target.value as 'master' | 'campaign')}
                      className="text-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-white">Master Resume</div>
                      <div className="text-xs text-slate-400">Foundational resume template</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createNewResume}
                disabled={!newResumeTitle.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Resume Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Import Resume</h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center gap-3">
                  {getStatusIcon()}
                  <div>
                    <p className="text-white font-medium">{getStatusText()}</p>
                    {importFile && (
                      <p className="text-slate-400 text-sm mt-1">{importFile.name}</p>
                    )}
                  </div>
                  
                  {!importFile && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Choose File
                    </button>
                  )}
                </div>
              </div>

              {importError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{importError}</p>
                </div>
              )}

              {importFile && (
                <div className="bg-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{importFile.name}</p>
                      <p className="text-slate-400 text-xs">
                        {(importFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => setImportFile(null)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-slate-700 rounded-lg p-3">
                <h4 className="text-sm font-medium text-white mb-2">Supported Formats</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div>• PDF (.pdf)</div>
                  <div>• Word (.docx)</div>
                  <div>• Word (.doc)</div>
                  <div>• Text (.txt)</div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Maximum file size: 10MB</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={processImportedFile}
                disabled={!importFile || importStatus === 'uploading' || importStatus === 'processing'}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {importStatus === 'uploading' ? 'Uploading...' : 
                 importStatus === 'processing' ? 'Processing...' : 
                 importStatus === 'success' ? 'Success!' : 'Import Resume'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Export Resume</h3>
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
                    alert('PDF download started!');
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
  );
};

export default SmartResumeStudio;