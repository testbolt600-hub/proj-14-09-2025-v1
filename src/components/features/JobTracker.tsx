import React, { useState } from 'react';
import { 
  FolderOpen, 
  Plus, 
  MoreHorizontal, 
  ExternalLink, 
  FileText, 
  MessageCircle,
  Calendar,
  DollarSign,
  MapPin,
  Building,
  Star,
  Clock,
  CheckCircle,
  X,
  Eye,
  Edit,
  Trash2,
  Target
} from 'lucide-react';

interface JobCard {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  matchScore: number;
  postedDate: string;
  source: string;
  status: 'new-leads' | 'reviewing' | 'applied' | 'interviewing' | 'offer' | 'rejected' | 'archived';
  notes?: string;
  applicationDate?: string;
  interviewDate?: string;
  contacts?: string[];
  url: string;
}

const JobTracker = () => {
  const [selectedCard, setSelectedCard] = useState<JobCard | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'details' | 'ai-assistant' | 'notes'>('details');

  const columns = [
    { id: 'new-leads', title: 'New Leads (from AI)', color: 'bg-blue-500' },
    { id: 'reviewing', title: 'To Apply / Reviewing', color: 'bg-yellow-500' },
    { id: 'applied', title: 'Applied', color: 'bg-purple-500' },
    { id: 'interviewing', title: 'Interviewing', color: 'bg-orange-500' },
    { id: 'offer', title: 'Offer', color: 'bg-green-500' },
    { id: 'rejected', title: 'Rejected', color: 'bg-red-500' },
    { id: 'archived', title: 'Archived / Not a Fit', color: 'bg-gray-500' }
  ];

  // Mock job cards data
  const jobCards: JobCard[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$130,000 - $170,000',
      matchScore: 94,
      postedDate: '2024-01-21',
      source: 'LinkedIn',
      status: 'new-leads',
      url: 'https://example.com/job/1'
    },
    {
      id: '2',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$120,000 - $150,000',
      matchScore: 87,
      postedDate: '2024-01-20',
      source: 'Indeed',
      status: 'reviewing',
      url: 'https://example.com/job/2'
    },
    {
      id: '3',
      title: 'Frontend Engineer',
      company: 'BigTech Corp',
      location: 'San Francisco, CA',
      salary: '$150,000 - $190,000',
      matchScore: 82,
      postedDate: '2024-01-19',
      source: 'Company Website',
      status: 'applied',
      applicationDate: '2024-01-21',
      url: 'https://example.com/job/3'
    },
    {
      id: '4',
      title: 'Software Engineer',
      company: 'InnovateCorp',
      location: 'Austin, TX (Hybrid)',
      salary: '$110,000 - $140,000',
      matchScore: 78,
      postedDate: '2024-01-18',
      source: 'AngelList',
      status: 'interviewing',
      applicationDate: '2024-01-19',
      interviewDate: '2024-01-25',
      url: 'https://example.com/job/4'
    }
  ];

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 80) return 'text-blue-400 bg-blue-500/20';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getJobsByStatus = (status: string) => {
    return jobCards.filter(job => job.status === status);
  };

  const handleCardClick = (card: JobCard) => {
    setSelectedCard(card);
    setShowCardModal(true);
    setActiveModalTab('details');
  };

  const handleMoveToInterviewing = (cardId: string) => {
    // This would trigger the Interview Prep Kit generation
    alert(`Moving job to Interviewing stage. Interview Prep Kit will be generated!`);
  };

  const handleDragStart = (e: React.DragEvent, card: JobCard) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(card));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const cardData = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    // If moving to interviewing, trigger prep kit generation
    if (targetStatus === 'interviewing' && cardData.status !== 'interviewing') {
      handleMoveToInterviewing(cardData.id);
    }
    
    // Update card status (in real app, this would update the database)
    console.log(`Moving ${cardData.title} to ${targetStatus}`);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Job Tracker</h1>
            <p className="text-gray-400 mt-1">Kanban board for managing your application pipeline</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          Add Job Manually
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => {
          const jobs = getJobsByStatus(column.id);
          
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 bg-[#111827] rounded-2xl border border-gray-700/50"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                    <h3 className="font-semibold text-white text-sm">{column.title}</h3>
                  </div>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {jobs.length}
                  </span>
                </div>
              </div>

              {/* Job Cards */}
              <div className="p-4 space-y-3 min-h-96">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job)}
                    onClick={() => handleCardClick(job)}
                    className="bg-[#1F2937] rounded-lg p-4 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all hover:transform hover:scale-105"
                  >
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2">{job.title}</h4>
                        <p className="text-gray-300 text-sm">{job.company}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}>
                        {job.matchScore}%
                      </span>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{job.location}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Posted {job.postedDate}</span>
                      </div>
                      {job.applicationDate && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">Applied {job.applicationDate}</span>
                        </div>
                      )}
                      {job.interviewDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-orange-400" />
                          <span className="text-orange-400">Interview {job.interviewDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {jobs.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-500 text-sm">No jobs in this stage</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Job Card Modal */}
      {showCardModal && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-white">{selectedCard.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(selectedCard.matchScore)}`}>
                  {selectedCard.matchScore}% match
                </span>
              </div>
              <button
                onClick={() => setShowCardModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveModalTab('details')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeModalTab === 'details' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Job Details
              </button>
              <button
                onClick={() => setActiveModalTab('ai-assistant')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeModalTab === 'ai-assistant' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                AI Assistant
              </button>
              <button
                onClick={() => setActiveModalTab('notes')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeModalTab === 'notes' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                My Notes & Activity
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              {activeModalTab === 'details' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Job Information</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedCard.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedCard.location}</span>
                        </div>
                        {selectedCard.salary && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{selectedCard.salary}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">Posted {selectedCard.postedDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-3">Application Status</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">Match Score: {selectedCard.matchScore}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">Source: {selectedCard.source}</span>
                        </div>
                        {selectedCard.applicationDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Applied on {selectedCard.applicationDate}</span>
                          </div>
                        )}
                        {selectedCard.interviewDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-400">Interview scheduled for {selectedCard.interviewDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white">Job Description</h4>
                      <button
                        onClick={() => window.open(selectedCard.url, '_blank')}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </button>
                    </div>
                    <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using React, TypeScript, and modern frontend technologies. The ideal candidate has 5+ years of experience and a passion for creating exceptional user experiences.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'ai-assistant' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Generated Cover Letter</h4>
                    <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        Dear Hiring Manager,
                        <br /><br />
                        I am writing to express my strong interest in the {selectedCard.title} position at {selectedCard.company}. With my extensive experience in React development and passion for creating exceptional user experiences, I am confident I would be a valuable addition to your team.
                        <br /><br />
                        My background includes 5+ years of frontend development, with particular expertise in React, TypeScript, and modern CSS frameworks. In my current role, I have successfully led the development of several high-impact web applications that serve thousands of users daily.
                        <br /><br />
                        I am excited about the opportunity to contribute to {selectedCard.company}'s mission and would welcome the chance to discuss how my skills and experience align with your needs.
                        <br /><br />
                        Best regards,<br />
                        [Your Name]
                      </p>
                      <div className="flex gap-2">
                        <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                          Copy
                        </button>
                        <button className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Tailored CV Highlights</h4>
                    <div className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Emphasize React and TypeScript experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Highlight frontend architecture projects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Include performance optimization achievements</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Mention cross-functional collaboration</span>
                        </div>
                      </div>
                      <button className="mt-4 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
                        Generate Tailored Resume
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'notes' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Contacts</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Add contact name and role..."
                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      />
                      <div className="text-gray-400 text-sm">No contacts added yet</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Important Dates</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Application Deadline</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Follow-up Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Notes</h4>
                    <textarea
                      placeholder="Add your notes about this opportunity..."
                      rows={6}
                      className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                      Save Notes
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Set Reminder
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">
              {jobCards.filter(job => job.status === 'new-leads').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">New Leads</p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold text-white">
              {jobCards.filter(job => job.status === 'applied').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Applications Sent</p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-orange-400" />
            <span className="text-2xl font-bold text-white">
              {jobCards.filter(job => job.status === 'interviewing').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Interviews Scheduled</p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">87%</span>
          </div>
          <p className="text-gray-400 text-sm">Avg. Match Score</p>
        </div>
      </div>
    </div>
  );
};

export default JobTracker;