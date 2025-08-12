import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Zap } from 'lucide-react';
import { signOut } from '../lib/supabase';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#040715]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-50">Supergrow.ai</span>
              </div>
              
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-50 mb-6">
              Welcome to Your <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              You've successfully signed in! This is where your onboarding journey will begin.
            </p>
            
            <div className="bg-[#111827] rounded-2xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-50 mb-4">Coming Soon</h2>
              <p className="text-gray-300 mb-6">
                Your personalized onboarding experience and content creation tools will be available here.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;