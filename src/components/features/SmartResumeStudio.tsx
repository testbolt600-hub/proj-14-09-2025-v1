import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download,
  Save,
  Upload,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import ResumeLibrary from './ResumeLibrary';
import AICopilot from './AICopilot';

interface Resume {
  id: string;
  title: string;
  type: 'master' | 'campaign';
  content: string;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
}

const SmartResumeStudio = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [activeResume, setActiveResume] = useState<Resume | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
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
        content: `John Doe\nSoftware Engineer\njohn.doe@email.com | (555) 123-4567\n\nPROFESSIONAL SUMMARY\nExperienced software engineer with 5+ years developing scalable web applications.\n\nEXPERIENCE\nSenior Software Engineer | TechCorp | 2022-Present\n• Led development of microservices architecture serving 100K+ users\n• Implemented CI/CD pipelines reducing deployment time by 60%`,
        atsScore: 85,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      {
        id: '2',
        title: 'Frontend Developer - Google',
        type: 'campaign',
        content: `John Doe\nFrontend Developer\njohn.doe@email.com | (555) 123-4567\n\nPROFESSIONAL SUMMARY\nFrontend-focused software engineer with expertise in React, TypeScript, and modern web development.\n\nEXPERIENCE\nSenior Software Engineer | TechCorp | 2022-Present\n• Architected React-based frontend applications serving 100K+ users\n• Optimized frontend performance resulting in 40% faster load times`,
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
    }
  }, []);

  const handleResumeSelect = (resumeId: string) => {
    const resume = resumes.find(r => r.id === resumeId);
    if (resume) {
      setActiveResumeId(resumeId);
      setActiveResume(resume);
      setEditorContent(resume.content);
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

  const runATSOptimization = async () => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAiProcessing(false);
  };

  const enhanceSelectedText = async () => {
    if (!selectedText) return;
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setEditorContent(editorContent.replace(selectedText, `Enhanced: ${selectedText}`));
    setSelectedText('');
    setAiProcessing(false);
  };

  const handleGapJustification = async () => {
    setAiProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiProcessing(false);
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
    setShowCreateModal(false);
    setNewResumeTitle('');
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
      // Validate file type
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
      
      // Validate file size (max 10MB)
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
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setImportStatus('processing');
      
      // Simulate content extraction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock extracted content based on file type
      let extractedContent = '';
      if (importFile.type === 'text/plain') {
        extractedContent = await importFile.text();
      } else {
        // For PDF/DOCX, simulate extracted content
        extractedContent = `Imported Resume Content\n\nName: ${importFile.name.replace(/\.[^/.]+$/, '')}\n\nPROFESSIONAL SUMMARY\n[Content extracted from ${importFile.name}]\n\nEXPERIENCE\n[Experience section extracted]\n\nEDUCATION\n[Education section extracted]\n\nSKILLS\n[Skills section extracted]`;
      }
      
      // Create new resume from imported content
      const newResume: Resume = {
        id: Date.now().toString(),
        title: `Imported - ${importFile.name.replace(/\.[^/.]+$/, '')}`,
        type: 'master',
        content: extractedContent,
        atsScore: Math.floor(Math.random() * 30) + 60, // Random score between 60-90
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setResumes([...resumes, newResume]);
      setActiveResumeId(newResume.id);
      setActiveResume(newResume);
      setEditorContent(newResume.content);
      
      setImportStatus('success');
      
      // Close modal after success
      setTimeout(() => {
        setShowImportModal(false);
        setImportFile(null);
        setImportStatus('idle');
        setImportError('');
      }, 1500);
      
    } catch (error) {
      setImportStatus('error');
      setImportError('Failed to process the file. Please try again.');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
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
        return <Upload className="w-6 h-6 text-blue-500" />;
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
      <div className="w-80 bg-slate-900 border-r border-slate-800 flex-shrink-0">
        <ResumeLibrary
          resumes={resumes}
          activeResumeId={activeResumeId}
          onSelectResume={handleResumeSelect}
          onCreateNew={() => setShowCreateModal(true)}
          onImportResume={handleImportResume}
        />
      </div>

      {/* Right Panel - Editor & AI Copilot */}
      <div className="flex-1 flex">
        {/* Document Editor */}
        <div className="flex-1 bg-slate-900 flex flex-col">
          {/* Editor Header */}
          <div className="bg-slate-800 border-b border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">
                  {activeResume?.title || 'Select a Resume'}
                </h3>
                {activeResume && (
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(activeResume.atsScore)} bg-opacity-20`}>
                    ATS: {activeResume.atsScore}%
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 p-6">
            {activeResume ? (
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                onSelect={(e) => setSelectedText(e.currentTarget.value.substring(e.currentTarget.selectionStart, e.currentTarget.selectionEnd))}
                className="w-full h-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-400 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none font-mono text-sm leading-relaxed"
                placeholder="Start writing your resume content here..."
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Welcome to Smart Resume Studio
                  </h3>
                  <p className="text-slate-400 max-w-md">
                    Select a resume from the library or create a new one to get started with AI-powered optimization.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Copilot Sidebar */}
        <AICopilot
          activeResume={activeResume}
          selectedText={selectedText}
          aiProcessing={aiProcessing}
          onATSOptimization={runATSOptimization}
          onEnhanceText={enhanceSelectedText}
          onGapJustification={handleGapJustification}
        />
      </div>

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
              {/* File Upload Area */}
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

              {/* Error Message */}
              {importError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{importError}</p>
                </div>
              )}

              {/* File Info */}
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

              {/* Supported Formats */}
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
    </div>
  );
};

export default SmartResumeStudio;
