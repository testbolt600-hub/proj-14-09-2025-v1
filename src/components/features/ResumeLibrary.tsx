import React from 'react';
import { Star, Target, Plus, Upload } from 'lucide-react';

interface Resume {
  id: string;
  title: string;
  type: 'master' | 'campaign';
  content: string;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
}

interface ResumeLibraryProps {
  resumes: Resume[];
  activeResumeId: string | null;
  onSelectResume: (id: string) => void;
  onCreateNew: () => void;
  onImportResume: () => void;
}

const ResumeLibrary: React.FC<ResumeLibraryProps> = ({
  resumes,
  activeResumeId,
  onSelectResume,
  onCreateNew,
  onImportResume
}) => {
  const masterResume = resumes.find(r => r.type === 'master');
  const campaignResumes = resumes.filter(r => r.type === 'campaign');

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Star className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Smart Resume Studio</h2>
          <p className="text-xs text-slate-400">AI-Powered Resume Management</p>
        </div>
      </div>

      {/* Master Resume */}
      {masterResume && (
        <div
          className={`p-3 rounded-lg border-2 mb-4 cursor-pointer transition-colors ${
            activeResumeId === masterResume.id
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-slate-700 hover:border-slate-600'
          }`}
          onClick={() => onSelectResume(masterResume.id)}
        >
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-white text-sm">Master Resume</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getScoreColor(masterResume.atsScore)}`}></div>
            <span className="text-xs text-slate-400">ATS: {masterResume.atsScore}%</span>
          </div>
        </div>
      )}

      {/* Campaign Resumes */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-300">Campaign Resumes</h3>
          <span className="text-xs text-slate-500">{campaignResumes.length}</span>
        </div>
        
        {campaignResumes.map((resume) => (
          <div
            key={resume.id}
            className={`p-3 rounded-lg border mb-2 cursor-pointer transition-colors ${
              activeResumeId === resume.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-700 hover:border-slate-600'
            }`}
            onClick={() => onSelectResume(resume.id)}
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="font-medium text-white text-sm truncate">{resume.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {new Date(resume.updatedAt).toLocaleDateString()}
              </span>
              <div className={`w-2 h-2 rounded-full ${getScoreColor(resume.atsScore)}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <button 
          onClick={onCreateNew}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Create New Resume
        </button>
        <button 
          onClick={onImportResume}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-700 text-slate-300 rounded-lg hover:border-slate-600 hover:text-white transition-colors"
        >
          <Upload className="w-4 h-4" />
          Import Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeLibrary;
