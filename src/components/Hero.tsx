import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-600/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.15)_0%,transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-50 mb-6 leading-tight">
            Turn Your Ideas into <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Viral LinkedIn Content
            </span> with AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Supergrow helps you write engaging posts, design stunning carousels, and schedule your content to build authority on LinkedIn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Create Your First Post Free
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="font-medium">Watch a 2-Min Demo</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-gray-400 mb-8">Trusted by 50,000+ Founders, Marketers, and Creators</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="bg-gray-700/30 px-6 py-3 rounded-lg">TechCorp</div>
              <div className="bg-gray-700/30 px-6 py-3 rounded-lg">StartupXYZ</div>
              <div className="bg-gray-700/30 px-6 py-3 rounded-lg">GrowthLab</div>
              <div className="bg-gray-700/30 px-6 py-3 rounded-lg">ScaleUp</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;