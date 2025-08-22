import React, { useState } from 'react';
import { 
  FolderOpen, 
  FileText, 
  Clock, 
  Star, 
  Target, 
  Download,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  User
} from 'lucide-react';

interface SavedItem {
  id: string;
  title: string;
  type: 'resume' | 'cover-letter' | 'tailored-resume' | 'application-tailor';
  content: string;
  createdAt: string;
  updatedAt: string;
  jobTitle?: string;
  company?: string;
  status: 'draft' | 'completed';
  atsScore?: number;
}

const ResumeManager = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'resumes' | 'cover-letters' | 'tailored' | 'drafts'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'type'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'completed'>('all');

  // Mock data for saved items
  const savedItems: SavedItem[] = [
    {
      id: '1',
      title: 'Master Resume',
      type: 'resume',
      content: 'Full resume content...',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      status: 'completed',
      atsScore: 85
    },
    {
      id: '2',
      title: 'Frontend Developer - Google',
      type: 'tailored-resume',
      content: 'Tailored resume content...',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-21',
      jobTitle: 'Frontend Developer',
      company: 'Google',
      status: 'completed',
      atsScore: 92
    },
    {
      id: '3',
      title: 'Cover Letter - Microsoft',
      type: 'cover-letter',
      content: 'Cover letter content...',
      createdAt: '2024-01-19',
      updatedAt: '2024-01-19',
      jobTitle: 'Software Engineer',
      company: 'Microsoft',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Product Manager - Meta (Draft)',
      type: 'tailored-resume',
      content: 'Partially completed resume...',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      jobTitle: 'Product Manager',
      company: 'Meta',
      status: 'draft',
      atsScore: 78
    },
    {
      id: '5',
      title: 'Data Scientist Cover Letter',
      type: 'cover-letter',
      content: 'Cover letter content...',
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17',
      jobTitle: 'Data Scientist',
      company: 'Netflix',
      status: 'draft'
    },
    {
      id: '6',
      title: 'Tailored Resume - Amazon SDE',
      type: 'application-tailor',
      content: 'Application Tailor generated resume...',
      createdAt: '2024-01-21',
      updatedAt: '2024-01-21',
      jobTitle: 'Software Development Engineer',
      company: 'Amazon',
      status: 'completed',
      atsScore: 94
    },
    {
      id: '7',
      title: 'Marketing Manager Cover Letter - Adobe',
      type: 'cover-letter',
      content: 'Cover letter generated content...',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      jobTitle: 'Marketing Manager',
      company: 'Adobe',
      status: 'completed'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'resume':
        return <Star className="w-5 h-5 text-yellow-400" />;
      case 'tailored-resume':
        return <Target className="w-5 h-5 text-orange-400" />;
      case 'application-tailor':
        return <Target className="w-5 h-5 text-orange-400" />;
      case 'cover-letter':
        return <FileText className="w-5 h-5 text-blue-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'resume':
        return 'Resume';
      case 'tailored-resume':
        return 'Tailored Resume';
      case 'application-tailor':
        return 'Application Tailor';
      case 'cover-letter':
        return 'Cover Letter';
      default:
        return 'Document';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredItems = savedItems.filter(item => {
    const matchesTab = activeTab === 'all' || 
                     (activeTab === 'resumes' && item.type === 'resume') ||
                     (activeTab === 'cover-letters' && item.type === 'cover-letter') ||
                     (activeTab === 'tailored' && (item.type === 'tailored-resume' || item.type === 'application-tailor'));
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesTab && matchesSearch && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const handleView = (item: SavedItem) => {
    alert(`Viewing: ${item.title}`);
  };

  const handleEdit = (item: SavedItem) => {
    alert(`Editing: ${item.title}`);
  };

  const handleDownload = (item: SavedItem) => {
    const element = document.createElement('a');
    const file = new Blob([item.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${item.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDelete = (item: SavedItem) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      alert(`Deleted: ${item.title}`);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
          <FolderOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Work History Manager</h1>
          <p className="text-gray-400 mt-1">Manage all your saved resumes, cover letters, and tailored documents</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Tabs */}
          <div className="flex bg-slate-800 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('resumes')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'resumes' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Resumes
            </button>
            <button
              onClick={() => setActiveTab('tailored')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'tailored' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Tailored Resumes
            </button>
            <button
              onClick={() => setActiveTab('cover-letters')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'cover-letters' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Cover Letters
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'type')}
              className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="type">Sort by Type</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'completed')}
              className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <FolderOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Documents Found</h3>
            <p className="text-slate-400">
              {searchQuery ? 'Try adjusting your search criteria' : 'Create your first document to get started'}
            </p>
          </div>
        ) : (
          sortedItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#111827] border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 hover:bg-[#1a1f36] transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getTypeIcon(item.type)}
                  <div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {getTypeLabel(item.type)}
                    </span>
                    {item.atsScore && (
                      <div className={`text-xs font-medium ${getScoreColor(item.atsScore)} mt-1`}>
                        ATS: {item.atsScore}%
                      </div>
                    )}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
                
                {item.jobTitle && item.company && (
                  <div className="text-sm text-gray-400 mb-2">
                    <span className="font-medium">{item.jobTitle}</span> at <span className="font-medium">{item.company}</span>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>Modified: {new Date(item.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(item)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(item)}
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => handleDelete(item)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-6 h-6 text-yellow-400" />
            <span className="text-lg font-semibold text-white">
              {savedItems.filter(item => item.type === 'resume').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Master Resumes</p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6 text-orange-400" />
            <span className="text-lg font-semibold text-white">
              {savedItems.filter(item => item.type === 'tailored-resume' || item.type === 'application-tailor').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Tailored Resumes</p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold text-white">
              {savedItems.filter(item => item.type === 'cover-letter').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Cover Letters</p>
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-yellow-400" />
            <span className="text-lg font-semibold text-white">
              {savedItems.filter(item => item.status === 'draft').length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Draft Documents</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeManager;