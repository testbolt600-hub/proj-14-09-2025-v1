import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Building, 
  MessageCircle, 
  FileText, 
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Target,
  Lightbulb,
  Archive,
  Plus,
  Eye
} from 'lucide-react';

interface InterviewPrep {
  id: string;
  jobTitle: string;
  company: string;
  interviewDate?: string;
  status: 'active' | 'archived';
  createdAt: string;
  companyBriefing?: {
    mission: string;
    products: string[];
    recentNews: string[];
    competitors: string[];
  };
  questions?: {
    question: string;
    category: string;
    starSuggestion: string;
  }[];
  suggestedQuestions?: string[];
}

const InterviewPrepKit = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'prep-guide'>('dashboard');
  const [selectedPrep, setSelectedPrep] = useState<InterviewPrep | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  // Mock interview prep data
  const interviewPreps: InterviewPrep[] = [
    {
      id: '1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      interviewDate: '2024-01-25',
      status: 'active',
      createdAt: '2024-01-21',
      companyBriefing: {
        mission: 'To democratize access to cutting-edge technology solutions for businesses worldwide.',
        products: ['Cloud Platform', 'AI Analytics Suite', 'Developer Tools'],
        recentNews: [
          'Raised $50M Series B funding',
          'Launched new AI-powered analytics platform',
          'Expanded to European markets'
        ],
        competitors: ['BigTech Corp', 'CloudSoft Inc.', 'DataFlow Systems']
      },
      questions: [
        {
          question: 'Tell me about a challenging frontend project you worked on.',
          category: 'Technical Experience',
          starSuggestion: 'Situation: Complex e-commerce platform rebuild. Task: Lead frontend architecture. Action: Implemented micro-frontend approach with React. Result: 40% performance improvement and 25% faster development cycles.'
        },
        {
          question: 'How do you ensure cross-browser compatibility?',
          category: 'Technical Skills',
          starSuggestion: 'Situation: Legacy browser support requirements. Task: Ensure compatibility across all major browsers. Action: Implemented progressive enhancement and comprehensive testing. Result: 99.9% compatibility across target browsers.'
        },
        {
          question: 'Describe a time when you had to work with a difficult team member.',
          category: 'Behavioral',
          starSuggestion: 'Situation: Team member resistant to new technologies. Task: Maintain team harmony and project progress. Action: Organized knowledge sharing sessions and paired programming. Result: Improved team collaboration and successful project delivery.'
        }
      ],
      suggestedQuestions: [
        'What are the biggest technical challenges the frontend team is currently facing?',
        'How does the company approach technical debt and code quality?',
        'What opportunities are there for professional development and growth?',
        'Can you tell me about the team structure and collaboration processes?'
      ]
    },
    {
      id: '2',
      jobTitle: 'React Developer',
      company: 'StartupXYZ',
      interviewDate: '2024-01-28',
      status: 'active',
      createdAt: '2024-01-22',
      companyBriefing: {
        mission: 'Building the future of remote collaboration through innovative software solutions.',
        products: ['Remote Work Platform', 'Team Collaboration Tools', 'Productivity Analytics'],
        recentNews: [
          'Acquired by major tech company',
          'Reached 1M active users milestone',
          'Launched mobile application'
        ],
        competitors: ['Slack', 'Microsoft Teams', 'Zoom']
      }
    },
    {
      id: '3',
      jobTitle: 'Software Engineer',
      company: 'BigTech Corp',
      status: 'archived',
      createdAt: '2024-01-15'
    }
  ];

  const activePreps = interviewPreps.filter(prep => prep.status === 'active');
  const archivedPreps = interviewPreps.filter(prep => prep.status === 'archived');

  const handleViewPrepGuide = (prep: InterviewPrep) => {
    setSelectedPrep(prep);
    setActiveView('prep-guide');
  };

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
    setSelectedPrep(null);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Interview Prep Kit</h1>
            <p className="text-gray-400 mt-1">AI-powered interview preparation and guidance</p>
          </div>
        </div>
        
        {activeView === 'prep-guide' && (
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Dashboard
          </button>
        )}
      </div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <div className="space-y-8">
          {/* Active Interview Preps */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-50">Active Interview Preparations</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                Create Manual Prep
              </button>
            </div>
            
            {activePreps.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">No Active Interview Preparations</h4>
                <p className="text-gray-400 mb-6">
                  Interview prep guides are automatically created when you move jobs to "Interviewing" in the Job Tracker
                </p>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Go to Job Tracker
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePreps.map((prep) => (
                  <div
                    key={prep.id}
                    className="bg-[#1F2937] rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all hover:transform hover:scale-105 cursor-pointer"
                    onClick={() => handleViewPrepGuide(prep)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{prep.jobTitle}</h4>
                        <p className="text-gray-300 text-sm">{prep.company}</p>
                      </div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    
                    {prep.interviewDate && (
                      <div className="flex items-center gap-2 mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400 text-sm font-medium">
                          Interview: {prep.interviewDate}
                        </span>
                      </div>
                    )}
                    
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <Building className="w-3 h-3" />
                        <span>Company briefing ready</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-3 h-3" />
                        <span>{prep.questions?.length || 0} practice questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-3 h-3" />
                        <span>{prep.suggestedQuestions?.length || 0} questions to ask</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Prep Guide
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Archived Preps */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                <Archive className="w-5 h-5 text-gray-400" />
                Archived Preparations
              </h3>
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {showArchived ? 'Hide' : 'Show'} ({archivedPreps.length})
              </button>
            </div>
            
            {showArchived && (
              <div className="space-y-3">
                {archivedPreps.map((prep) => (
                  <div key={prep.id} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg border border-gray-700">
                    <div>
                      <h4 className="font-medium text-gray-300">{prep.jobTitle}</h4>
                      <p className="text-gray-400 text-sm">{prep.company}</p>
                    </div>
                    <button
                      onClick={() => handleViewPrepGuide(prep)}
                      className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Detailed Prep Guide View */}
      {activeView === 'prep-guide' && selectedPrep && (
        <div className="space-y-8">
          {/* Prep Guide Header */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedPrep.jobTitle}</h2>
                <p className="text-gray-300">{selectedPrep.company}</p>
                {selectedPrep.interviewDate && (
                  <div className="flex items-center gap-2 mt-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg w-fit">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400 font-medium">Interview: {selectedPrep.interviewDate}</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">Prep Guide Generated</div>
                <div className="text-white font-medium">{selectedPrep.createdAt}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Briefing */}
              {selectedPrep.companyBriefing && (
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-400" />
                    Company Briefing
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Mission</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {selectedPrep.companyBriefing.mission}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Key Products</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPrep.companyBriefing.products.map((product, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Recent News</h4>
                      <div className="space-y-2">
                        {selectedPrep.companyBriefing.recentNews.map((news, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300 text-sm">{news}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Key Competitors</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPrep.companyBriefing.competitors.map((competitor, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                            {competitor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interview Questions */}
              {selectedPrep.questions && (
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                    Tailored Interview Questions
                  </h3>
                  
                  <div className="space-y-6">
                    {selectedPrep.questions.map((q, index) => (
                      <div key={index} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-white">{q.question}</h4>
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                            {q.category}
                          </span>
                        </div>
                        
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                          <h5 className="text-green-400 font-medium text-sm mb-2">STAR Framework Suggestion:</h5>
                          <p className="text-gray-300 text-sm leading-relaxed">{q.starSuggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions to Ask */}
              {selectedPrep.suggestedQuestions && (
                <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Suggested Questions for the Interviewer
                  </h3>
                  
                  <div className="space-y-3">
                    {selectedPrep.suggestedQuestions.map((question, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#1F2937] rounded-lg border border-gray-700">
                        <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-yellow-400 text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Interview Checklist */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-4">Interview Checklist</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="text-green-500" />
                    <span className="text-gray-300 text-sm">Research company background</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="text-green-500" />
                    <span className="text-gray-300 text-sm">Prepare STAR examples</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="text-green-500" />
                    <span className="text-gray-300 text-sm">Practice technical questions</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="text-green-500" />
                    <span className="text-gray-300 text-sm">Prepare questions to ask</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="text-green-500" />
                    <span className="text-gray-300 text-sm">Test video call setup</span>
                  </label>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-4">Interview Tips</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Arrive 5-10 minutes early for virtual interviews</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Have specific examples ready for behavioral questions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Ask thoughtful questions about the role and team</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">Follow up within 24 hours with a thank you note</p>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-50 mb-4">Export Prep Guide</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                    Download as PDF
                  </button>
                  <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                    Print prep guide
                  </button>
                  <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                    Share with mentor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      )}

      {/* Main Dashboard View */}
      {activeView === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePreps.map((prep) => (
            <div
              key={prep.id}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all hover:transform hover:scale-105 cursor-pointer"
              onClick={() => handleViewPrepGuide(prep)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{prep.jobTitle}</h3>
                  <p className="text-gray-300 text-sm">{prep.company}</p>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              
              {prep.interviewDate && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 text-sm font-medium">
                    Interview Date: {prep.interviewDate}
                  </span>
                </div>
              )}
              
              <div className="space-y-2 text-xs text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-3 h-3" />
                  <span>Company briefing ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3 h-3" />
                  <span>{prep.questions?.length || 0} practice questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-3 h-3" />
                  <span>{prep.suggestedQuestions?.length || 0} questions to ask</span>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View Full Prep Guide
              </button>
            </div>
          ))}
          
          {activePreps.length === 0 && (
            <div className="col-span-full text-center py-20">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Active Interview Preparations</h3>
              <p className="text-gray-400 mb-6">
                Interview prep guides are automatically created when you move jobs to "Interviewing" in the Job Tracker
              </p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Go to Job Tracker
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewPrepKit;