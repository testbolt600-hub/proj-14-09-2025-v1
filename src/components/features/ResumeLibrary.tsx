import React from 'react';
import { Star, Target } from 'lucide-react';

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
}

const ResumeLibrary: React.FC<ResumeLibraryProps> = ({
  resumes,
  activeResumeId,
  onSelectResume
}) => {
  const masterResume = resumes.find(r => r.type === 'master');

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

    </div>
  );
};

export default ResumeLibrary;