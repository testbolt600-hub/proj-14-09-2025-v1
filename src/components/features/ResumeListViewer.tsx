import React, { useState } from 'react';
import { FileText, Clock, Star, Target } from 'lucide-react';

interface Resume {
  id: string;
  title: string;
  type: 'master' | 'campaign';
  content: string;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
}

interface ResumeListViewerProps {
  resumes: Resume[];
  onSelectResume: (id: string) => void;
}

const ResumeListViewer: React.FC<ResumeListViewerProps> = ({
  resumes,
  onSelectResume
}) => {
  const [activeView, setActiveView] = useState<'saved' | 'drafts'>('saved');

  const savedResumes = resumes.filter(r => r.type === 'campaign');
  
  // Mock draft data
  const draftResumes = [
    {
      id: 'draft-1',
      title: 'Product Manager - Meta (Unsaved)',
      lastModified: '2024-01-19',
      content: 'Partially completed resume...',
      reason: 'Browser closed accidentally'
    },
    {
      id: 'draft-2',
      title: 'Data Scientist - Netflix (Unsaved)',
      lastModified: '2024-01-18',
      content: 'Work in progress...',
      reason: 'Session timeout'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="h-full bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Resume Management</h2>
          <p className="text-slate-400">Manage your saved resumes and recover drafts</p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700 mb-6 w-fit">
          <button
            onClick={() => setActiveView('saved')}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              activeView === 'saved' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Saved
          </button>
          <button
            onClick={() => setActiveView('drafts')}
            className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
              activeView === 'drafts' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            Drafts
          </button>
        </div>

        {/* Content */}
        {activeView === 'saved' ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Saved Resumes ({savedResumes.length})</h3>
            
            {savedResumes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No Saved Resumes</h4>
                <p className="text-slate-400">Create your first resume to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedResumes.map((resume) => (
                  <div
                    key={resume.id}
                    onClick={() => onSelectResume(resume.id)}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-pointer hover:border-slate-600 hover:bg-slate-700/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium text-white">Campaign</span>
                      </div>
                      <div className={`text-xs font-medium ${getScoreColor(resume.atsScore)}`}>
                        {resume.atsScore}%
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-white mb-2 line-clamp-2">{resume.title}</h4>
                    
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>Created: {new Date(resume.createdAt).toLocaleDateString()}</div>
                      <div>Modified: {new Date(resume.updatedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Draft Resumes ({draftResumes.length})</h3>
            
            {draftResumes.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No Draft Resumes</h4>
                <p className="text-slate-400">Accidentally closed resumes will appear here</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {draftResumes.map((draft) => (
                  <div
                    key={draft.id}
                    className="bg-slate-800 border border-orange-500/30 rounded-lg p-4 cursor-pointer hover:border-orange-500/50 hover:bg-slate-700/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-400" />
                        <span className="text-sm font-medium text-orange-400">Draft</span>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-white mb-2 line-clamp-2">{draft.title}</h4>
                    
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>Last modified: {draft.lastModified}</div>
                      <div className="text-orange-400">Reason: {draft.reason}</div>
                    </div>

                    <button
                      onClick={() => {
                        // Simulate recovering draft
                        alert(`Recovering draft: ${draft.title}`);
                      }}
                      className="w-full mt-3 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Recover Draft
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeListViewer;