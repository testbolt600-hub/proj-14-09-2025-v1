import React from 'react';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const FinalCTA = () => {
  const [ref, isInView] = useInView();
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-purple-100/20 to-pink-100/30"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={ref} className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Your Career Breakthrough <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Starts Today</span>
          </h2>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Stop leaving your career to chance. Join thousands of professionals who discovered the secret to getting hired faster AND building unstoppable authority.
          </p>

          {/* Urgency Element */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-8 border border-indigo-200/50">
            <div className="flex items-center justify-center gap-2 text-indigo-600 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Limited Time Offer</span>
            </div>
            <p className="text-slate-700 text-sm">Get your free career analysis before our AI waitlist fills up</p>
          </div>

          {/* Dual CTA Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Get My Free Career Analysis Now
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate('/signup')}
              className="border-2 border-indigo-300 text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300"
            >
              Optimize My LinkedIn Profile
            </button>
          </div>

          {/* Risk Reversal */}
          <div className="space-y-2 text-slate-600">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free analysis with no credit card required</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>See results in under 5 minutes</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Used by professionals at Fortune 500 companies</span>
            </div>
          </div>

          <div className="mt-8 text-slate-500">
            <p className="text-lg">Starting at $29/month • Cancel anytime • Results guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;