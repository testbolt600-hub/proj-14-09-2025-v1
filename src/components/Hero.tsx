import React from 'react';
import { ArrowRight, Play, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Stop Playing Career Roulette - <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Get The Job AND Build The Authority
            </span> You Deserve
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Finally, a platform that treats your career and personal brand as one powerful system. 
            No more getting lost in the ATS black hole or burning out from content creation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Start Your Career Transformation
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors group">
              <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
                <Play className="w-5 h-5" />
              </div>
              <span className="font-medium">Watch 2-Min Demo</span>
            </button>
          </div>

          {/* Trust Indicator */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center gap-2 text-slate-600 mb-8">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">Join 10,000+ professionals who landed better roles and built stronger brands</span>
            </div>
            
            {/* Company Logos */}
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200">Google</div>
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200">Microsoft</div>
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200">Amazon</div>
              <div className="bg-white/80 px-6 py-3 rounded-lg shadow-sm border border-slate-200">Meta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;