import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Building,
  Target,
  TrendingUp,
  MessageCircle,
  Plus,
  Filter,
  Search,
  Bell,
  ExternalLink,
  User,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Navigation,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Coffee,
  Handshake,
  Network,
  Zap,
  BarChart3,
  Settings,
  X
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  type: 'conference' | 'workshop' | 'networking' | 'webinar' | 'meetup';
  industry: string[];
  relevanceScore: number;
  attendeeCount: number;
  price: number;
  isPaid: boolean;
  isVirtual: boolean;
  imageUrl: string;
  organizerName: string;
  organizerCompany: string;
  roleModelsAttending: RoleModel[];
  connectionsAttending: number;
  tags: string[];
  registrationUrl: string;
  isSaved: boolean;
  isRegistered: boolean;
}

interface RoleModel {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  linkedinUrl: string;
  isFollowing: boolean;
  influenceScore: number;
  recentActivity: string;
}

interface NetworkingGoal {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  deadline: string;
  category: 'connections' | 'mentors' | 'clients' | 'collaborators';
  isCompleted: boolean;
}

interface EventAttendee {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  mutualConnections: number;
  relevanceScore: number;
  recentActivity: string;
  linkedinUrl: string;
}

const CareerEventScout = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'discover' | 'calendar' | 'network' | 'goals' | 'analytics'>('dashboard');
  const [events, setEvents] = useState<Event[]>([]);
  const [roleModels, setRoleModels] = useState<RoleModel[]>([]);
  const [networkingGoals, setNetworkingGoals] = useState<NetworkingGoal[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAddRoleModelModal, setShowAddRoleModelModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetCount: 0,
    deadline: '',
    category: 'connections' as const
  });
  const [newRoleModel, setNewRoleModel] = useState({
    name: '',
    linkedinUrl: ''
  });

  // Mock data initialization
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'AI Leadership Summit 2025',
        description: 'Join industry leaders discussing the future of AI in business transformation and leadership.',
        date: '2025-03-15',
        time: '09:00',
        location: 'San Francisco, CA',
        venue: 'Moscone Center',
        type: 'conference',
        industry: ['Technology', 'AI', 'Leadership'],
        relevanceScore: 95,
        attendeeCount: 1200,
        price: 299,
        isPaid: true,
        isVirtual: false,
        imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
        organizerName: 'TechEvents Inc.',
        organizerCompany: 'TechEvents Inc.',
        roleModelsAttending: [
          {
            id: '1',
            name: 'Sarah Chen',
            title: 'VP of AI',
            company: 'Google',
            avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            linkedinUrl: 'https://linkedin.com/in/sarahchen',
            isFollowing: true,
            influenceScore: 92,
            recentActivity: 'Posted about AI ethics in product development'
          }
        ],
        connectionsAttending: 8,
        tags: ['AI', 'Leadership', 'Innovation', 'Strategy'],
        registrationUrl: 'https://example.com/register',
        isSaved: false,
        isRegistered: false
      },
      {
        id: '2',
        title: 'Remote Work Excellence Workshop',
        description: 'Master the art of remote team leadership and distributed collaboration.',
        date: '2025-02-28',
        time: '14:00',
        location: 'Virtual Event',
        venue: 'Zoom',
        type: 'workshop',
        industry: ['Management', 'Remote Work', 'Leadership'],
        relevanceScore: 87,
        attendeeCount: 150,
        price: 0,
        isPaid: false,
        isVirtual: true,
        imageUrl: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
        organizerName: 'Remote Leaders',
        organizerCompany: 'Remote Leaders Community',
        roleModelsAttending: [],
        connectionsAttending: 3,
        tags: ['Remote Work', 'Leadership', 'Team Management'],
        registrationUrl: 'https://example.com/register',
        isSaved: true,
        isRegistered: true
      },
      {
        id: '3',
        title: 'Tech Networking Mixer',
        description: 'Connect with fellow tech professionals in a relaxed networking environment.',
        date: '2025-02-25',
        time: '18:30',
        location: 'Austin, TX',
        venue: 'The Domain',
        type: 'networking',
        industry: ['Technology', 'Startups'],
        relevanceScore: 78,
        attendeeCount: 80,
        price: 25,
        isPaid: true,
        isVirtual: false,
        imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
        organizerName: 'Austin Tech Community',
        organizerCompany: 'Austin Tech Hub',
        roleModelsAttending: [],
        connectionsAttending: 12,
        tags: ['Networking', 'Startups', 'Tech'],
        registrationUrl: 'https://example.com/register',
        isSaved: false,
        isRegistered: false
      }
    ];

    const mockRoleModels: RoleModel[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        title: 'VP of AI',
        company: 'Google',
        avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        linkedinUrl: 'https://linkedin.com/in/sarahchen',
        isFollowing: true,
        influenceScore: 92,
        recentActivity: 'Posted about AI ethics in product development'
      },
      {
        id: '2',
        name: 'Marcus Rodriguez',
        title: 'CTO',
        company: 'TechStartup',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        linkedinUrl: 'https://linkedin.com/in/marcusrodriguez',
        isFollowing: true,
        influenceScore: 88,
        recentActivity: 'Speaking at DevConf next month'
      }
    ];

    const mockGoals: NetworkingGoal[] = [
      {
        id: '1',
        title: 'Connect with AI Product Managers',
        description: 'Build relationships with PMs working on AI products',
        targetCount: 5,
        currentCount: 2,
        deadline: '2025-04-01',
        category: 'connections',
        isCompleted: false
      },
      {
        id: '2',
        title: 'Find Technical Mentors',
        description: 'Connect with senior engineers for career guidance',
        targetCount: 2,
        currentCount: 1,
        deadline: '2025-03-15',
        category: 'mentors',
        isCompleted: false
      }
    ];

    setEvents(mockEvents);
    setRoleModels(mockRoleModels);
    setNetworkingGoals(mockGoals);
  }, []);

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 80) return 'text-blue-400 bg-blue-500/20';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'conference': return Building;
      case 'workshop': return GraduationCap;
      case 'networking': return Users;
      case 'webinar': return Globe;
      case 'meetup': return Coffee;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'bg-blue-500/20 text-blue-400';
      case 'workshop': return 'bg-purple-500/20 text-purple-400';
      case 'networking': return 'bg-green-500/20 text-green-400';
      case 'webinar': return 'bg-orange-500/20 text-orange-400';
      case 'meetup': return 'bg-pink-500/20 text-pink-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleSaveEvent = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, isSaved: !event.isSaved } : event
    ));
  };

  const handleFollowRoleModel = (roleModelId: string) => {
    setRoleModels(roleModels.map(rm => 
      rm.id === roleModelId ? { ...rm, isFollowing: !rm.isFollowing } : rm
    ));
  };

  const addNetworkingGoal = () => {
    if (!newGoal.title || !newGoal.targetCount || !newGoal.deadline) return;
    
    const goal: NetworkingGoal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      targetCount: newGoal.targetCount,
      currentCount: 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      isCompleted: false
    };
    
    setNetworkingGoals([...networkingGoals, goal]);
    setNewGoal({
      title: '',
      description: '',
      targetCount: 0,
      deadline: '',
      category: 'connections'
    });
    setShowAddGoalModal(false);
  };

  const addRoleModel = () => {
    if (!newRoleModel.name || !newRoleModel.linkedinUrl) return;
    
    const roleModel: RoleModel = {
      id: Date.now().toString(),
      name: newRoleModel.name,
      title: 'Industry Professional',
      company: 'Unknown',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      linkedinUrl: newRoleModel.linkedinUrl,
      isFollowing: true,
      influenceScore: 75,
      recentActivity: 'Recently added to your tracking list'
    };
    
    setRoleModels([...roleModels, roleModel]);
    setNewRoleModel({
      name: '',
      linkedinUrl: ''
    });
    setShowAddRoleModelModal(false);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilters.length === 0) return matchesSearch;
    
    return matchesSearch && selectedFilters.some(filter => 
      event.type === filter || 
      event.industry.includes(filter) ||
      (filter === 'virtual' && event.isVirtual) ||
      (filter === 'free' && !event.isPaid)
    );
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Network className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">AI Career Event Scout & Networking Assistant</h1>
          <p className="text-gray-400 mt-1">Discover events, track role models, and build meaningful connections</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'discover' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Discover Events
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'calendar' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          My Calendar
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'network' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Role Models
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'goals' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Networking Goals
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Events */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Upcoming Events
              </h3>
              
              <div className="space-y-4">
                {events.filter(e => e.isRegistered || e.isSaved).slice(0, 3).map((event) => (
                  <div key={event.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start gap-4">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-50 mb-1">{event.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.isRegistered ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {event.isRegistered ? 'Registered' : 'Saved'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(event.relevanceScore)}`}>
                            {event.relevanceScore}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Model Activity */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Role Model Activity
              </h3>
              
              <div className="space-y-4">
                {roleModels.slice(0, 3).map((roleModel) => (
                  <div key={roleModel.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start gap-4">
                      <img 
                        src={roleModel.avatar} 
                        alt={roleModel.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-50">{roleModel.name}</h4>
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                            Following
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{roleModel.title} at {roleModel.company}</p>
                        <p className="text-sm text-gray-400">{roleModel.recentActivity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Networking Score */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Networking Score</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-purple-400 mb-2">78</div>
                <div className="text-gray-400">Overall Score</div>
                <div className="text-green-400 text-sm mt-1">+12 this month</div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Event Attendance</span>
                  <span className="text-green-400">Excellent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Connection Quality</span>
                  <span className="text-blue-400">Very Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Follow-up Rate</span>
                  <span className="text-yellow-400">Good</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Events Attended</span>
                  <span className="text-blue-400 font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">New Connections</span>
                  <span className="text-green-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Follow-ups Sent</span>
                  <span className="text-purple-400 font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Goals Progress</span>
                  <span className="text-yellow-400 font-semibold">67%</span>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Event Opportunity</p>
                  <p className="text-gray-300 text-sm">AI Leadership Summit has 3 of your role models attending</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">Networking Tip</p>
                  <p className="text-gray-300 text-sm">Your follow-up rate improved 40% when you message within 24 hours</p>
                </div>
                
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-purple-400 text-sm font-medium mb-1">Goal Progress</p>
                  <p className="text-gray-300 text-sm">You're 60% towards your Q1 networking goals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discover Events Tab */}
      {activeTab === 'discover' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search events, topics, or speakers..."
                    className="w-full pl-10 pr-4 py-3 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {['conference', 'workshop', 'networking', 'webinar', 'virtual', 'free', 'Technology', 'AI', 'Leadership'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setSelectedFilters(prev => 
                            prev.includes(filter) 
                              ? prev.filter(f => f !== filter)
                              : [...prev, filter]
                          );
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedFilters.includes(filter)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => {
                const EventTypeIcon = getEventTypeIcon(event.type);
                
                return (
                  <div
                    key={event.id}
                    className="bg-[#111827] rounded-2xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 hover:bg-[#1a1f36] transition-all duration-300 cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="relative">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEvent(event.id);
                          }}
                          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                            event.isSaved 
                              ? 'bg-red-500/80 text-white' 
                              : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${event.isSaved ? 'fill-current' : ''}`} />
                        </button>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getRelevanceColor(event.relevanceScore)}`}>
                          {event.relevanceScore}% match
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-50 mb-2 line-clamp-2">{event.title}</h4>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendeeCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.isVirtual ? 'Virtual' : event.location}
                        </span>
                      </div>

                      {event.roleModelsAttending.length > 0 && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex -space-x-2">
                            {event.roleModelsAttending.slice(0, 3).map((rm) => (
                              <img
                                key={rm.id}
                                src={rm.avatar}
                                alt={rm.name}
                                className="w-6 h-6 rounded-full border-2 border-gray-700"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-yellow-400">
                            {event.roleModelsAttending.length} role model{event.roleModelsAttending.length > 1 ? 's' : ''} attending
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          {event.isPaid ? (
                            <span className="text-green-400 font-medium">${event.price}</span>
                          ) : (
                            <span className="text-green-400 font-medium">Free</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveEvent(event.id);
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              event.isSaved 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-gray-600 hover:bg-gray-700 text-white'
                            }`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(event.registrationUrl, '_blank');
                            }}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Categories */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Event Categories</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Conferences</span>
                  <span className="text-blue-400 font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Workshops</span>
                  <span className="text-purple-400 font-semibold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Networking</span>
                  <span className="text-green-400 font-semibold">31</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Webinars</span>
                  <span className="text-orange-400 font-semibold">42</span>
                </div>
              </div>
            </div>

            {/* Trending Events */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Trending This Week</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">AI Ethics Conference</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>March 20</span>
                    <span className="text-green-400">+40% interest</span>
                  </div>
                </div>
                
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">Remote Leadership Summit</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>March 25</span>
                    <span className="text-blue-400">+25% interest</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('goals')}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  Set networking goals
                </button>
                <button
                  onClick={() => setActiveTab('network')}
                  className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors"
                >
                  Add role models
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Export calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Models Tab */}
      {activeTab === 'network' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50">Role Models You Follow</h3>
                <button
                  onClick={() => setShowAddRoleModelModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Role Model
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roleModels.map((roleModel) => (
                  <div key={roleModel.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start gap-4">
                      <img 
                        src={roleModel.avatar} 
                        alt={roleModel.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-50">{roleModel.name}</h4>
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                            {roleModel.influenceScore}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{roleModel.title}</p>
                        <p className="text-sm text-gray-300 mb-3">{roleModel.company}</p>
                        <p className="text-xs text-gray-400 mb-3">{roleModel.recentActivity}</p>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleFollowRoleModel(roleModel.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                              roleModel.isFollowing
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gray-600 hover:bg-gray-700 text-white'
                            }`}
                          >
                            {roleModel.isFollowing ? 'Following' : 'Follow'}
                          </button>
                          <button
                            onClick={() => window.open(roleModel.linkedinUrl, '_blank')}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            <Linkedin className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Suggested Role Models</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">Dr. Emily Watson</h4>
                  <p className="text-gray-400 text-xs mb-2">Chief AI Officer at Microsoft</p>
                  <button className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors">
                    Follow
                  </button>
                </div>
                
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">James Liu</h4>
                  <p className="text-gray-400 text-xs mb-2">Founder of TechStartup</p>
                  <button className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Activity Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Speaking Event</p>
                  <p className="text-gray-300 text-sm">Sarah Chen is speaking at DevConf next week</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">New Post</p>
                  <p className="text-gray-300 text-sm">Marcus Rodriguez shared insights on team leadership</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Networking Goals Tab */}
      {activeTab === 'goals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50">Your Networking Goals</h3>
                <button
                  onClick={() => setShowAddGoalModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  New Goal
                </button>
              </div>
              
              <div className="space-y-4">
                {networkingGoals.map((goal) => (
                  <div key={goal.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-50">{goal.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        goal.category === 'connections' ? 'bg-blue-500/20 text-blue-400' :
                        goal.category === 'mentors' ? 'bg-purple-500/20 text-purple-400' :
                        goal.category === 'clients' ? 'bg-green-500/20 text-green-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {goal.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{goal.description}</p>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(goal.currentCount / goal.targetCount) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">
                        {goal.currentCount} of {goal.targetCount} • Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                      <span className={`font-medium ${
                        (goal.currentCount / goal.targetCount) >= 0.8 ? 'text-green-400' :
                        (goal.currentCount / goal.targetCount) >= 0.5 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {Math.round((goal.currentCount / goal.targetCount) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Goal Categories</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Professional Connections
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Mentorship Relationships
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Client Acquisition
                </button>
                <button className="w-full text-left p-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-lg transition-colors">
                  Collaboration Partners
                </button>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Progress Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Goals</span>
                  <span className="text-indigo-400 font-semibold">{networkingGoals.filter(g => !g.isCompleted).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completed Goals</span>
                  <span className="text-green-400 font-semibold">{networkingGoals.filter(g => g.isCompleted).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Avg. Progress</span>
                  <span className="text-purple-400 font-semibold">67%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Networking Analytics
              </h3>
              
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive analytics charts coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Events Attended</span>
                  <span className="text-blue-400 font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Connections Made</span>
                  <span className="text-green-400 font-semibold">34</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Follow-up Rate</span>
                  <span className="text-purple-400 font-semibold">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">ROI Score</span>
                  <span className="text-yellow-400 font-semibold">85/100</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Top Performing Events</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">DevConf 2024</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>8 connections made</span>
                    <span className="text-green-400">High ROI</span>
                  </div>
                </div>
                
                <div className="p-3 bg-[#1F2937] rounded-lg">
                  <h4 className="font-medium text-gray-50 text-sm mb-1">AI Ethics Workshop</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>5 connections made</span>
                    <span className="text-blue-400">Medium ROI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">{selectedEvent.title}</h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <img 
                      src={selectedEvent.imageUrl} 
                      alt={selectedEvent.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(selectedEvent.type)}`}>
                        {selectedEvent.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRelevanceColor(selectedEvent.relevanceScore)}`}>
                        {selectedEvent.relevanceScore}% match
                      </span>
                      {selectedEvent.isPaid ? (
                        <span className="text-green-400 font-medium">${selectedEvent.price}</span>
                      ) : (
                        <span className="text-green-400 font-medium">Free</span>
                      )}
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">{selectedEvent.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedEvent.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedEvent.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedEvent.attendeeCount} attendees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{selectedEvent.organizerName}</span>
                        </div>
                      </div>
                    </div>

                    {selectedEvent.roleModelsAttending.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-white mb-3">Role Models Attending</h4>
                        <div className="space-y-3">
                          {selectedEvent.roleModelsAttending.map((rm) => (
                            <div key={rm.id} className="flex items-center gap-3 p-3 bg-[#1F2937] rounded-lg">
                              <img 
                                src={rm.avatar} 
                                alt={rm.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-50 text-sm">{rm.name}</h5>
                                <p className="text-gray-400 text-xs">{rm.title} at {rm.company}</p>
                              </div>
                              <button
                                onClick={() => window.open(rm.linkedinUrl, '_blank')}
                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                              >
                                <Linkedin className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedEvent.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#1F2937] rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-4">Networking Intelligence</h4>
                    
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-400 text-sm font-medium mb-1">Potential Connections</p>
                        <p className="text-gray-300 text-sm">12 attendees match your networking goals</p>
                      </div>
                      
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-green-400 text-sm font-medium mb-1">Your Network</p>
                        <p className="text-gray-300 text-sm">{selectedEvent.connectionsAttending} of your connections attending</p>
                      </div>
                      
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <p className="text-purple-400 text-sm font-medium mb-1">Conversation Starters</p>
                        <p className="text-gray-300 text-sm">"I saw your recent post about AI ethics..."</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => window.open(selectedEvent.registrationUrl, '_blank')}
                      className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Register for Event
                    </button>
                    
                    <button
                      onClick={() => handleSaveEvent(selectedEvent.id)}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                        selectedEvent.isSaved
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-gray-600 hover:bg-gray-700 text-white'
                      }`}
                    >
                      {selectedEvent.isSaved ? 'Remove from Saved' : 'Save Event'}
                    </button>
                    
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Add Networking Goal</h3>
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="e.g., Connect with AI Product Managers"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder="Describe your networking goal..."
                  rows={3}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Count</label>
                  <input
                    type="number"
                    value={newGoal.targetCount}
                    onChange={(e) => setNewGoal({...newGoal, targetCount: Number(e.target.value)})}
                    min="1"
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="connections">Connections</option>
                    <option value="mentors">Mentors</option>
                    <option value="clients">Clients</option>
                    <option value="collaborators">Collaborators</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddGoalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addNetworkingGoal}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Role Model Modal */}
      {showAddRoleModelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Add Role Model</h3>
              <button
                onClick={() => setShowAddRoleModelModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={newRoleModel.name}
                  onChange={(e) => setNewRoleModel({...newRoleModel, name: e.target.value})}
                  placeholder="e.g., Sarah Chen"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={newRoleModel.linkedinUrl}
                  onChange={(e) => setNewRoleModel({...newRoleModel, linkedinUrl: e.target.value})}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddRoleModelModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addRoleModel}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add Role Model
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerEventScout;