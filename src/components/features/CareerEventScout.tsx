import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Star, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Bookmark,
  ExternalLink,
  Clock,
  Building,
  User,
  Target,
  TrendingUp,
  Bell,
  Settings,
  Globe,
  Linkedin,
  Twitter,
  Mail,
  Phone
} from 'lucide-react';

interface CareerEvent {
  id: string;
  title: string;
  type: 'conference' | 'workshop' | 'networking' | 'webinar' | 'meetup';
  date: string;
  location: string;
  isVirtual: boolean;
  description: string;
  attendees: number;
  speakers: string[];
  relevanceScore: number;
  industry: string[];
  skills: string[];
  url: string;
  price: string;
  isBookmarked: boolean;
}

interface RoleModel {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  followersCount: number;
  engagementRate: number;
  contentThemes: string[];
  recentPosts: string[];
  linkedinUrl: string;
  twitterUrl?: string;
  isFollowing: boolean;
  influenceScore: number;
  avatar: string;
}

interface NetworkingOpportunity {
  id: string;
  type: 'event_attendee' | 'speaker_connection' | 'industry_leader' | 'peer_professional';
  name: string;
  title: string;
  company: string;
  mutualConnections: number;
  relevanceScore: number;
  contactInfo: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  suggestedApproach: string;
  eventContext?: string;
}

const CareerEventScout = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'role-models' | 'networking' | 'insights'>('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');

  // Mock data
  const events: CareerEvent[] = [
    {
      id: '1',
      title: 'React Summit 2024',
      type: 'conference',
      date: '2024-03-15',
      location: 'San Francisco, CA',
      isVirtual: false,
      description: 'The biggest React conference bringing together developers, designers, and industry leaders.',
      attendees: 2500,
      speakers: ['Dan Abramov', 'Sophie Alpert', 'Sebastian Markbåge'],
      relevanceScore: 95,
      industry: ['Technology', 'Software Development'],
      skills: ['React', 'JavaScript', 'Frontend Development'],
      url: 'https://reactsummit.com',
      price: '$599',
      isBookmarked: true
    },
    {
      id: '2',
      title: 'Tech Leadership Masterclass',
      type: 'workshop',
      date: '2024-02-28',
      location: 'Virtual',
      isVirtual: true,
      description: 'Learn advanced leadership techniques for engineering managers and tech leads.',
      attendees: 150,
      speakers: ['John Smith', 'Sarah Johnson'],
      relevanceScore: 88,
      industry: ['Technology', 'Management'],
      skills: ['Leadership', 'Team Management', 'Engineering Management'],
      url: 'https://techleadership.com',
      price: 'Free',
      isBookmarked: false
    },
    {
      id: '3',
      title: 'AI & Machine Learning Expo',
      type: 'conference',
      date: '2024-04-10',
      location: 'Austin, TX',
      isVirtual: false,
      description: 'Explore the latest in AI and ML technologies with industry experts.',
      attendees: 1800,
      speakers: ['Andrew Ng', 'Fei-Fei Li', 'Yann LeCun'],
      relevanceScore: 82,
      industry: ['Technology', 'Artificial Intelligence'],
      skills: ['Machine Learning', 'AI', 'Data Science'],
      url: 'https://aimlexpo.com',
      price: '$799',
      isBookmarked: false
    }
  ];

  const roleModels: RoleModel[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'VP of Engineering',
      company: 'Meta',
      industry: 'Technology',
      followersCount: 45000,
      engagementRate: 4.2,
      contentThemes: ['Engineering Leadership', 'Team Building', 'Tech Trends'],
      recentPosts: [
        'Building high-performing engineering teams in 2024',
        'The future of remote engineering management',
        'Lessons learned from scaling engineering at Meta'
      ],
      linkedinUrl: 'https://linkedin.com/in/sarahchen',
      twitterUrl: 'https://twitter.com/sarahchen',
      isFollowing: true,
      influenceScore: 92,
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      title: 'Senior Staff Engineer',
      company: 'Google',
      industry: 'Technology',
      followersCount: 28000,
      engagementRate: 3.8,
      contentThemes: ['System Design', 'Architecture', 'Performance'],
      recentPosts: [
        'Designing systems for billion-user scale',
        'Performance optimization techniques that actually work',
        'The evolution of microservices at Google'
      ],
      linkedinUrl: 'https://linkedin.com/in/marcusrodriguez',
      isFollowing: false,
      influenceScore: 87,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const networkingOpportunities: NetworkingOpportunity[] = [
    {
      id: '1',
      type: 'speaker_connection',
      name: 'Dan Abramov',
      title: 'Software Engineer',
      company: 'Meta',
      mutualConnections: 12,
      relevanceScore: 95,
      contactInfo: {
        linkedin: 'https://linkedin.com/in/danabramov',
        twitter: 'https://twitter.com/dan_abramov'
      },
      suggestedApproach: 'Comment thoughtfully on his recent posts about React development',
      eventContext: 'Speaking at React Summit 2024'
    },
    {
      id: '2',
      type: 'industry_leader',
      name: 'Jennifer Walsh',
      title: 'CTO',
      company: 'TechStartup Inc.',
      mutualConnections: 8,
      relevanceScore: 78,
      contactInfo: {
        linkedin: 'https://linkedin.com/in/jenniferwalsh',
        email: 'jennifer@techstartup.com'
      },
      suggestedApproach: 'Connect with a personalized message about shared interest in React development',
      eventContext: 'Attending React Summit 2024'
    }
  ];

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20';
    if (score >= 80) return 'text-blue-400 bg-blue-500/20';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'conference': return <Users className="w-4 h-4 text-purple-400" />;
      case 'workshop': return <Target className="w-4 h-4 text-blue-400" />;
      case 'networking': return <Users className="w-4 h-4 text-green-400" />;
      case 'webinar': return <Globe className="w-4 h-4 text-orange-400" />;
      case 'meetup': return <Users className="w-4 h-4 text-pink-400" />;
      default: return <Calendar className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesLocation = filterLocation === 'all' || 
                           (filterLocation === 'virtual' && event.isVirtual) ||
                           (filterLocation === 'in-person' && !event.isVirtual);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">AI Career Event Scout & Networking Assistant</h1>
          <p className="text-gray-400 mt-1">Discover events, track role models, and build meaningful connections</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'events' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Career Events
        </button>
        <button
          onClick={() => setActiveTab('role-models')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'role-models' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Role Models
        </button>
        <button
          onClick={() => setActiveTab('networking')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'networking' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Networking Opportunities
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === 'insights' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          AI Insights
        </button>
      </div>

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-50">Recommended Career Events</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search events..."
                      className="pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="conference">Conferences</option>
                    <option value="workshop">Workshops</option>
                    <option value="networking">Networking</option>
                    <option value="webinar">Webinars</option>
                    <option value="meetup">Meetups</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-6">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-semibold text-gray-50">{event.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(event.relevanceScore)}`}>
                              {event.relevanceScore}% match
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.attendees.toLocaleString()} attendees
                            </span>
                            <span className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {event.price}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {event.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                            {event.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                                +{event.skills.length - 3} more
                              </span>
                            )}
                          </div>
                          
                          <div className="text-sm text-gray-400">
                            <strong>Speakers:</strong> {event.speakers.join(', ')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            // Toggle bookmark
                            event.isBookmarked = !event.isBookmarked;
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            event.isBookmarked 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'bg-gray-700 text-gray-400 hover:text-yellow-400'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(event.url, '_blank')}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Event Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="conference">Conferences</option>
                    <option value="workshop">Workshops</option>
                    <option value="networking">Networking Events</option>
                    <option value="webinar">Webinars</option>
                    <option value="meetup">Meetups</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Locations</option>
                    <option value="virtual">Virtual Only</option>
                    <option value="in-person">In-Person Only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  >
                    <option value="all">All Dates</option>
                    <option value="this-month">This Month</option>
                    <option value="next-month">Next Month</option>
                    <option value="next-quarter">Next Quarter</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Bookmarked Events</h3>
              <div className="space-y-3">
                {events.filter(e => e.isBookmarked).map((event) => (
                  <div key={event.id} className="p-3 bg-[#1F2937] rounded-lg">
                    <h4 className="font-medium text-gray-50 text-sm mb-1">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Models Tab */}
      {activeTab === 'role-models' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Industry Role Models & Influencers</h3>
              
              <div className="space-y-6">
                {roleModels.map((person) => (
                  <div key={person.id} className="bg-[#1F2937] rounded-lg p-6 border border-gray-700">
                    <div className="flex items-start gap-4">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-50">{person.name}</h4>
                            <p className="text-gray-300">{person.title} at {person.company}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRelevanceColor(person.influenceScore)}`}>
                              {person.influenceScore} influence
                            </span>
                            <button
                              onClick={() => {
                                person.isFollowing = !person.isFollowing;
                              }}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                person.isFollowing
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              {person.isFollowing ? 'Following' : 'Follow'}
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="text-sm">
                            <span className="text-gray-400">Followers:</span>
                            <span className="text-gray-50 ml-2">{person.followersCount.toLocaleString()}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">Engagement:</span>
                            <span className="text-gray-50 ml-2">{person.engagementRate}%</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-300 mb-2">Content Themes:</h5>
                          <div className="flex flex-wrap gap-2">
                            {person.contentThemes.map((theme) => (
                              <span key={theme} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-gray-300 mb-2">Recent Posts:</h5>
                          <div className="space-y-1">
                            {person.recentPosts.slice(0, 2).map((post, index) => (
                              <p key={index} className="text-gray-400 text-sm">• {post}</p>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <a
                            href={person.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                          </a>
                          {person.twitterUrl && (
                            <a
                              href={person.twitterUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
                            >
                              <Twitter className="w-4 h-4" />
                              Twitter
                            </a>
                          )}
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
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Following</h3>
              <div className="space-y-3">
                {roleModels.filter(p => p.isFollowing).map((person) => (
                  <div key={person.id} className="flex items-center gap-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-50 text-sm">{person.name}</h4>
                      <p className="text-gray-400 text-xs">{person.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">Trending Topic</p>
                  <p className="text-gray-300 text-sm">React Server Components are gaining momentum</p>
                </div>
                
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">Networking Tip</p>
                  <p className="text-gray-300 text-sm">Follow Sarah Chen's content strategy approach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Networking Tab */}
      {activeTab === 'networking' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-6">Smart Networking Opportunities</h3>
              
              <div className="space-y-4">
                {networkingOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="bg-[#1F2937] rounded-lg p-4 border border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-50">{opportunity.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(opportunity.relevanceScore)}`}>
                            {opportunity.relevanceScore}% match
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{opportunity.title} at {opportunity.company}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {opportunity.mutualConnections} mutual connections
                          </span>
                          {opportunity.eventContext && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {opportunity.eventContext}
                            </span>
                          )}
                        </div>
                        <div className="bg-[#111827] rounded-lg p-3 mb-3">
                          <h5 className="text-sm font-medium text-gray-50 mb-1">AI Suggested Approach:</h5>
                          <p className="text-gray-300 text-sm">{opportunity.suggestedApproach}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {opportunity.contactInfo.linkedin && (
                        <a
                          href={opportunity.contactInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect
                        </a>
                      )}
                      {opportunity.contactInfo.twitter && (
                        <a
                          href={opportunity.contactInfo.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                          Follow
                        </a>
                      )}
                      <button className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors">
                        Save Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Networking Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Opportunities Found</span>
                  <span className="text-blue-400 font-semibold">{networkingOpportunities.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Connections Made</span>
                  <span className="text-green-400 font-semibold">8 this month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Events Attended</span>
                  <span className="text-purple-400 font-semibold">3 this quarter</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-50 mb-4">Networking Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Research attendees before events</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Engage with speakers' content beforehand</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Follow up within 48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Tab */}
      {activeTab === 'insights' && (
        <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-gray-50 mb-6">AI Career Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">Event Recommendation</h4>
                <p className="text-gray-300 text-sm">React Summit 2024 has the highest relevance for your career goals</p>
              </div>
              
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-medium mb-2">Networking Strategy</h4>
                <p className="text-gray-300 text-sm">Focus on connecting with engineering leaders in your target companies</p>
              </div>
              
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="text-purple-400 font-medium mb-2">Content Opportunity</h4>
                <p className="text-gray-300 text-sm">Share insights from events you attend to build thought leadership</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h4 className="text-orange-400 font-medium mb-2">Career Growth</h4>
                <p className="text-gray-300 text-sm">Following Sarah Chen's content strategy could accelerate your leadership development</p>
              </div>
              
              <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                <h4 className="text-pink-400 font-medium mb-2">Industry Trends</h4>
                <p className="text-gray-300 text-sm">AI and machine learning events are trending in your network</p>
              </div>
              
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <h4 className="text-cyan-400 font-medium mb-2">Skill Development</h4>
                <p className="text-gray-300 text-sm">Attend workshops on system design to strengthen your technical leadership</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerEventScout;