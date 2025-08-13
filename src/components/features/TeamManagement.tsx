import React, { useState } from 'react';
import { Users, Settings, Shield, Mail, Phone, MapPin, Edit, Trash2, Plus, Crown, User } from 'lucide-react';

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'settings'>('team');
  
  const teamMembers = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@company.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2024-01-20',
      avatar: null
    },
    {
      id: '2', 
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Editor',
      status: 'Active',
      lastActive: '2024-01-19',
      avatar: null
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@company.com', 
      role: 'Viewer',
      status: 'Invited',
      lastActive: null,
      avatar: null
    }
  ];

  const roles = [
    { id: 'admin', name: 'Admin', description: 'Full access to all features' },
    { id: 'editor', name: 'Editor', description: 'Can create and edit content' },
    { id: 'viewer', name: 'Viewer', description: 'Can view analytics and content' }
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-50">Team Management & Settings</h1>
          <p className="text-gray-400 mt-1">Manage team access and account settings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#111827] rounded-lg p-1 border border-gray-700 mb-8 w-fit">
        <button
          onClick={() => setActiveTab('team')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'team' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Team Members
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          Account Settings
        </button>
      </div>

      {activeTab === 'team' ? (
        <div className="space-y-6">
          {/* Team Members */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-50 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Team Members
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                Invite Member
              </button>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg border border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-50">{member.name}</h4>
                        {member.role === 'Admin' && (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{member.email}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          member.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                          member.status === 'Invited' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {member.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {member.lastActive ? `Last active: ${member.lastActive}` : 'Not active yet'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <select className="px-3 py-2 bg-[#111827] border border-gray-600 rounded-lg text-gray-50 text-sm">
                      {roles.map((role) => (
                        <option key={role.id} value={role.id} selected={role.name === member.role}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roles & Permissions */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Roles & Permissions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map((role) => (
                <div key={role.id} className="p-4 bg-[#1F2937] rounded-lg border border-gray-700">
                  <h4 className="font-medium text-gray-50 mb-2">{role.name}</h4>
                  <p className="text-gray-400 text-sm mb-4">{role.description}</p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        role.id === 'admin' ? 'bg-green-400' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-gray-300">Full dashboard access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        role.id !== 'viewer' ? 'bg-green-400' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-gray-300">Create and edit content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        role.id === 'admin' ? 'bg-green-400' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-gray-300">Manage team members</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-400" />
              Account Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue="Supergrow Inc."
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Industry
                </label>
                <select className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none">
                  <option>Technology</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Company Size
                </label>
                <select className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none">
                  <option>1-10 employees</option>
                  <option>11-50 employees</option>
                  <option>51-200 employees</option>
                  <option>200+ employees</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time Zone
                </label>
                <select className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-6 (Central Time)</option>
                  <option>UTC-7 (Mountain Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-400" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Primary Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@supergrow.com"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  defaultValue="123 Business St, San Francisco, CA 94105"
                  className="w-full px-3 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-gray-50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-50 mb-6">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-50">Email Notifications</h4>
                  <p className="text-sm text-gray-400">Receive updates about your account and content</p>
                </div>
                <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-indigo-600">
                  <span className="sr-only">Enable notifications</span>
                  <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-50">Performance Reports</h4>
                  <p className="text-sm text-gray-400">Weekly analytics and insights</p>
                </div>
                <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-indigo-600">
                  <span className="sr-only">Enable reports</span>
                  <span className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-50">Team Activity</h4>
                  <p className="text-sm text-gray-400">Notifications when team members post or comment</p>
                </div>
                <button className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-600">
                  <span className="sr-only">Enable team notifications</span>
                  <span className="inline-block w-4 h-4 transform bg-white rounded-full transition"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;

