import React, { useState } from 'react';
import { Users, Brain, MessageCircle, FileText, Clock, Target, CheckCircle, ArrowRight } from 'lucide-react';

const InterviewPrepKit = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: Brain,
      title: 'AI Mock Interviews',
      description: 'Practice with AI-powered interview simulations tailored to your role and industry.'
    },
    {
      icon: MessageCircle,
      title: 'Question Bank',
      description: 'Access thousands of real interview questions from top companies.'
    },
    {
      icon: FileText,
      title: 'Answer Templates',
      description: 'Get structured frameworks for answering behavioral and technical questions.'
    },
    {
      icon: Target,
      title: 'Performance Analytics',
      description: 'Track your progress and identify areas for improvement.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold">Interview Prep Kit</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Master your interviews with AI-powered preparation tools and personalized coaching.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-900 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'practice', label: 'Practice' },
            { id: 'questions', label: 'Questions' },
            { id: 'analytics', label: 'Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-600/20 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Start */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
              <h2 className="text-2xl font-bold mb-6">Quick Start Guide</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Set Your Goals</h3>
                    <p className="text-slate-400 text-sm">Define your target role and company preferences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Practice Sessions</h3>
                    <p className="text-slate-400 text-sm">Start with AI mock interviews and question practice.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Track Progress</h3>
                    <p className="text-slate-400 text-sm">Monitor your improvement and refine your approach.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <h2 className="text-2xl font-bold mb-6">AI Mock Interview</h2>
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Your Practice Session</h3>
              <p className="text-slate-400 mb-6">Choose your interview type and begin practicing with our AI interviewer.</p>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto">
                Start Mock Interview
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <h2 className="text-2xl font-bold mb-6">Question Bank</h2>
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Browse Interview Questions</h3>
              <p className="text-slate-400 mb-6">Explore our comprehensive database of interview questions by category.</p>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
                Browse Questions
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <h2 className="text-2xl font-bold mb-6">Performance Analytics</h2>
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-slate-400 mb-6">View detailed analytics on your interview performance and improvement areas.</p>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
                View Analytics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrepKit;