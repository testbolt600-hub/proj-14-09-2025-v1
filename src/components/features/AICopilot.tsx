import React from 'react';
import { 
  Brain, 
  Shield, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  CheckCircle 
} from 'lucide-react';

interface Resume {
  id: string;
  title: string;
  type: 'master' | 'campaign';
  content: string;
  atsScore: number;
  createdAt: string;
  updatedAt: string;
}

interface AICopilotProps {
  activeResume: Resume | null;
  selectedText: string;
  aiProcessing: boolean;
  onATSOptimization: () => void;
  onEnhanceText: () => void;
  onGapJustification: () => void;
}

const AICopilot: React.FC<AICopilotProps> = ({
  activeResume,
  selectedText,
  aiProcessing,
  onATSOptimization,
  onEnhanceText,
  onGapJustification
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!activeResume) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-slate-300">Ready to assist</span>
        </div>
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">
            Select a resume to start AI-powered optimization
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-slate-300">
          {activeResume.type === 'master' ? 'Foundational Check' : 'Targeted Optimization'}
        </span>
      </div>

      {/* ATS Score Display */}
      <div className="bg-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">ATS Compatibility</span>
          <Shield className="w-4 h-4 text-blue-400" />
        </div>
        <div className={`text-2xl font-bold ${getScoreColor(activeResume.atsScore)}`}>
          {activeResume.atsScore}%
        </div>
        <div className="text-xs text-slate-400 mt-1">
          {activeResume.atsScore >= 90 ? 'Excellent' : activeResume.atsScore >= 70 ? 'Good' : 'Needs Improvement'}
        </div>
      </div>

      {/* AI Tools */}
      <div className="space-y-3">
        <button
          onClick={onATSOptimization}
          disabled={aiProcessing}
          className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4 text-green-400" />
          <div className="text-left">
            <div className="text-sm font-medium text-white">ATS Compatibility</div>
            <div className="text-xs text-slate-400">Scan for formatting issues</div>
          </div>
          {aiProcessing && <RefreshCw className="w-4 h-4 animate-spin text-blue-400 ml-auto" />}
        </button>

        <button
          onClick={onEnhanceText}
          disabled={!selectedText || aiProcessing}
          className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50"
        >
          <TrendingUp className="w-4 h-4 text-purple-400" />
          <div className="text-left">
            <div className="text-sm font-medium text-white">Impact Enhancer</div>
            <div className="text-xs text-slate-400">Transform bullets into achievements</div>
          </div>
          {aiProcessing && <RefreshCw className="w-4 h-4 animate-spin text-blue-400 ml-auto" />}
        </button>

        <button
          onClick={onGapJustification}
          disabled={aiProcessing}
          className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50"
        >
          <Clock className="w-4 h-4 text-orange-400" />
          <div className="text-left">
            <div className="text-sm font-medium text-white">Gap Justifier</div>
            <div className="text-xs text-slate-400">Address career breaks</div>
          </div>
        </button>
      </div>

      {/* Selected Text Enhancement */}
      {selectedText && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-400 mb-2">Selected Text</h4>
          <p className="text-xs text-slate-300 mb-3 line-clamp-3">{selectedText}</p>
          <button
            onClick={onEnhanceText}
            disabled={aiProcessing}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            Enhance Text
          </button>
        </div>
      )}

      {/* AI Tips */}
      <div className="bg-slate-700 rounded-lg p-4">
        <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          AI Tips
        </h4>
        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <p>Use action verbs to start bullet points</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <p>Include quantifiable achievements</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <p>Match keywords from job descriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICopilot;