import React, { useState } from 'react';
import { 
  Target, 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  Star,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Filter,
  BarChart3,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Upload,
  Settings
} from 'lucide-react';

interface JobSearchCampaign {
  id: string;
  name: string;
  jobTitles: string[];
  location: string;
  workType: 'remote' | 'onsite' | 'hybrid';
  salaryRange: { min: number; max: number };
  matchThreshold: number;
  status: 'active' | 'paused';
  createdAt: string;
  lastRun: string;
  totalJobs: number;
  newJobs: number;
}

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  matchScore: number;
  postedDate: string;
  source: string;
  description: string;
  requirements: string[];
  benefits: string[];
  url: string;
}

const JobFinder = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'onboarding' | 'matches'>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // Onboarding form state
  const [workLocation, setWorkLocation] = useState<'remote' | 'onsite' | 'hybrid'>('remote');
  const [jobTypes, setJobTypes] = useState<string[]>(['fulltime']);
  const [jobTitles, setJobTitles] = useState('');
  const [seniority, setSeniority] = useState<string[]>([]);
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const [matchThreshold, setMatchThreshold] = useState(75);
  const [resumeUploaded, setResumeUploaded] = useState(false);

  // Mock data
  const campaigns: JobSearchCampaign[] = [
    {
      id: '1',
      name: 'Senior Frontend Developer',
      jobTitles: ['Senior Frontend Developer', 'Frontend Engineer', 'React Developer'],
      location: 'Remote',
      workType: 'remote',
      salaryRange: { min: 120000, max: 180000 },
      matchThreshold: 80,
      status: 'active',
      createdAt: '2024-01-15',
      lastRun: '2024-01-21 09:00',
      totalJobs: 47,
      newJobs: 3
    },
    {
      id: '2',
      name: 'Full Stack Engineer',
      jobTitles: ['Full Stack Engineer', 'Software Engineer', 'Backend Developer'],
      location: 'San Francisco, CA',
      workType: 'hybrid',
      salaryRange: { min: 140000, max: 200000 },
      matchThreshold: 75,
      status: 'paused',
      createdAt: '2024-01-10',
      lastRun: '2024-01-20 14:30',
      totalJobs: 23,
      newJobs: 0
    }
  ];

  const jobMatches: JobMatch[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$130,000 - $170,000',
      matchScore: 94,
      postedDate: '2024-01-21',
      source: 'LinkedIn',
      description: 'We are looking for a Senior Frontend Developer to join our growing team...',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'Modern CSS'],
      benefits: ['Health insurance', 'Remote work', '401k matching'],
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
      description: 'Join our innovative team building the next generation of web applications...',
      requirements: ['React expertise', 'Node.js experience', 'Agile methodology'],
      benefits: ['Equity package', 'Flexible hours', 'Learning budget'],
      url: 'https://example.com/job/2'
    },
    {
      id: '3',
      title: 'Frontend Engineer',
      company: 'BigTech Corp',
      location: 'San Francisco, CA (Hybrid)',
      salary: '$150,000 - $190,000',
      matchScore: 82,
      postedDate: '2024-01-19',
      source: 'Company Website',
      description: 'We are seeking a talented Frontend Engineer to help build scalable web applications...',
      requirements: ['JavaScript/TypeScript', 'React/Vue/Angular', 'CSS frameworks'],
      benefits: ['Stock options', 'Health benefits', 'Gym membership'],
      url: 'https://example.com/job/3'
    }
  ];

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
    setOnboardingStep(1);
    setActiveTab('onboarding');
  };

  const handleNextStep = () => {
    if (onboardingStep < 4) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const handleFinishOnboarding = () => {
    // Create new campaign from onboarding data
    setShowOnboarding(false);
    setActiveTab('dashboard');
  };

  const toggleJobType = (type: string) => {
    setJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleSeniority = (level: string) => {
    setSeniority(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 80) return 'text-blue-400 bg-blue-500/20';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Job Finder</h1>
            <p className="text-gray-400 mt-1">AI-powered job search and scoring engine</p>
          </div>
        </div>
        
        {!showOnboarding && (
          <button
            onClick={handleStartOnboarding}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            New Search Campaign
          </button>
        )}
      </div>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Copilot Configuration</h2>
            <p className="text-gray-400">Step {onboardingStep} of 4</p>
            <p className="text-gray-300 mt-2">
              {onboardingStep === 1 && "First, select the Work Location and Jobs you are looking for"}
              {onboardingStep === 2 && "Next, narrow your search with optional filters"}
              {onboardingStep === 3 && "Now let's complete screening questions"}
              {onboardingStep === 4 && "Final Step!"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(onboardingStep / 4) * 100}%` }}
            ></div>
          </div>

          {/* Step 1: Work Location & Job Types */}
          {onboardingStep === 1 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Work Location</h3>
                <p className="text-gray-400 mb-4">Are you looking for jobs that are remote, have a physical location, or both?</p>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500">
                    <input
                      type="radio"
                      name="workLocation"
                      value="remote"
                      checked={workLocation === 'remote'}
                      onChange={(e) => setWorkLocation(e.target.value as 'remote' | 'onsite' | 'hybrid')}
                      className="text-indigo-500"
                    />
                    <div>
                      <div className="text-white font-medium">Remote Jobs</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500">
                    <input
                      type="radio"
                      name="workLocation"
                      value="onsite"
                      checked={workLocation === 'onsite'}
                      onChange={(e) => setWorkLocation(e.target.value as 'remote' | 'onsite' | 'hybrid')}
                      className="text-indigo-500"
                    />
                    <div>
                      <div className="text-white font-medium">On-site Jobs / Hybrid</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Job Types</h3>
                <p className="text-gray-400 mb-4">What job types are you looking for? Select at least one.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Fulltime', 'Part-Time', 'Contractor / Temp', 'Internship'].map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleJobType(type.toLowerCase().replace(/\s+/g, ''))}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        jobTypes.includes(type.toLowerCase().replace(/\s+/g, ''))
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Job Titles</h3>
                <p className="text-gray-400 mb-4">What job titles are you looking for? Type in and select up to 5</p>
                
                <input
                  type="text"
                  value={jobTitles}
                  onChange={(e) => setJobTitles(e.target.value)}
                  placeholder="Job titles / keywords"
                  className="w-full px-4 py-3 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Optional Filters */}
          {onboardingStep === 2 && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Increase Job Match</h3>
                <p className="text-gray-400 mb-4">Your copilot will only apply to jobs where you meet more than half of the key requirements.</p>
                
                <div className="bg-[#1F2937] rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">Match Threshold: {matchThreshold}%</span>
                    <span className="text-indigo-400 text-sm">Higher</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    value={matchThreshold}
                    onChange={(e) => setMatchThreshold(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <p className="text-yellow-400 text-sm mt-2">
                    💡 Your copilot will only apply to jobs where you meet more than {matchThreshold}% of the key requirements.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Seniority (optional)</h3>
                <p className="text-gray-400 mb-4">Filter jobs by seniority.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Entry Level', 'Associate Level', 'Mid-to-Senior Level', 'Director Level and above'].map((level) => (
                    <button
                      key={level}
                      onClick={() => toggleSeniority(level)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        seniority.includes(level)
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Time Zones (optional)</h3>
                <p className="text-gray-400 mb-4">Filter remote jobs by time zone.</p>
                
                <select
                  multiple
                  className="w-full px-4 py-3 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                >
                  <option value="pst">Pacific Time (PST)</option>
                  <option value="mst">Mountain Time (MST)</option>
                  <option value="cst">Central Time (CST)</option>
                  <option value="est">Eastern Time (EST)</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Profile Information */}
          {onboardingStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Confirm the CV/Resume you would like to use</h3>
                
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <button
                    onClick={() => setResumeUploaded(true)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Upload CV in PDF or Word
                  </button>
                  {resumeUploaded && (
                    <div className="mt-4 text-green-400 text-sm">✓ Resume uploaded successfully</div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Cover Letter</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-indigo-500 bg-indigo-500/10 rounded-lg">
                    <input
                      type="radio"
                      name="coverLetter"
                      value="generate"
                      defaultChecked
                      className="text-indigo-500"
                    />
                    <div>
                      <div className="text-indigo-400 font-medium">Auto-generate a tailored cover letter for each job (recommended)</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500">
                    <input
                      type="radio"
                      name="coverLetter"
                      value="upload"
                      className="text-indigo-500"
                    />
                    <div>
                      <div className="text-white font-medium">Upload my own generic Cover Letter</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Configuration */}
          {onboardingStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-4">Choose how JobCopilot works for you:</h3>
                
                <div className="space-y-4">
                  <label className="flex items-start gap-4 p-4 border border-indigo-500 bg-indigo-500/10 rounded-lg text-left">
                    <input
                      type="radio"
                      name="copilotMode"
                      value="manual"
                      defaultChecked
                      className="text-indigo-500 mt-1"
                    />
                    <div>
                      <div className="text-indigo-400 font-medium mb-2">Auto-Save & Manual Review:</div>
                      <p className="text-gray-300 text-sm">
                        Your copilot auto-fills application forms but does not submit them. You can review jobs and answers before submitting, this allows you to train your copilot ⚡
                      </p>
                      <p className="text-indigo-400 text-sm mt-2 italic">Recommended for new users</p>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-4 p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 text-left">
                    <input
                      type="radio"
                      name="copilotMode"
                      value="auto"
                      className="text-indigo-500 mt-1"
                    />
                    <div>
                      <div className="text-white font-medium mb-2">Full Auto-Apply:</div>
                      <p className="text-gray-300 text-sm">
                        Your copilot auto-fills and automatically submits applications.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-[#1F2937] rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">How it works:</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Your copilot will filter live jobs that match your search criteria, then will search for new jobs every 4 hours.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Based on the information you gave in the previous step, your copilot will answer screening questions on your behalf, powered by AI.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Your copilot will not reapply to jobs that it previously applied to.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              disabled={onboardingStep === 1}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-50"
            >
              Back
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowOnboarding(false)}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
              >
                Save & Close
              </button>
              
              {onboardingStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Next: {onboardingStep === 1 ? 'Optional Filters' : onboardingStep === 2 ? 'Profile Information' : 'Final Configuration'}
                </button>
              ) : (
                <button
                  onClick={handleFinishOnboarding}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Save Configuration
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      {!showOnboarding && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Active Search Campaigns</h3>
              
              {campaigns.length === 0 ? (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">No Active Campaigns</h4>
                  <p className="text-gray-400 mb-6">Create your first search campaign to start finding jobs</p>
                  <button
                    onClick={handleStartOnboarding}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Create Campaign
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            campaign.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                          }`}></div>
                          <h4 className="font-semibold text-white">{campaign.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {campaign.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            title={campaign.status === 'active' ? 'Pause' : 'Resume'}
                          >
                            {campaign.status === 'active' ? 
                              <Pause className="w-4 h-4" /> : 
                              <Play className="w-4 h-4" />
                            }
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Location:</span>
                          <p className="text-white font-medium">{campaign.location}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Salary:</span>
                          <p className="text-white font-medium">
                            ${campaign.salaryRange.min.toLocaleString()} - ${campaign.salaryRange.max.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400">Total Jobs:</span>
                          <p className="text-white font-medium">{campaign.totalJobs}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">New Jobs:</span>
                          <p className="text-blue-400 font-medium">{campaign.newJobs}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-xs text-gray-500">
                        Last run: {campaign.lastRun} • Match threshold: {campaign.matchThreshold}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Job Matches */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Recent Job Matches</h3>
              
              <div className="space-y-4">
                {jobMatches.map((job) => (
                  <div key={job.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-white">{job.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(job.matchScore)}`}>
                            {job.matchScore}% match
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-1">{job.company}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          {job.salary && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {job.salary}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.postedDate}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(job.url, '_blank')}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          title="View Job"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          title="Add to Tracker"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-2">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search Stats */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Search Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Campaigns</span>
                  <span className="text-indigo-400 font-semibold">{campaigns.filter(c => c.status === 'active').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Jobs Found</span>
                  <span className="text-green-400 font-semibold">{campaigns.reduce((sum, c) => sum + c.totalJobs, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">New This Week</span>
                  <span className="text-blue-400 font-semibold">{campaigns.reduce((sum, c) => sum + c.newJobs, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Avg. Match Score</span>
                  <span className="text-purple-400 font-semibold">87%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  View all job matches
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Export search results
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Update search preferences
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Market Trend</p>
                  <p className="text-gray-300 text-sm">Frontend roles are up 15% this month</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">Skill Demand</p>
                  <p className="text-gray-300 text-sm">React and TypeScript are highly sought after</p>
                </div>
                
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-400 text-sm font-medium mb-1">Salary Insight</p>
                  <p className="text-gray-300 text-sm">Your target range is competitive for your experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFinder;