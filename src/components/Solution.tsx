import React from 'react';
import { Zap, Target, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Solution = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Meet Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI-Powered Career Growth Engine</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Solution Content */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="space-y-6">
              <p className="text-xl text-slate-600 leading-relaxed">
                We built the first platform that understands a simple truth: your next job search and your personal brand 
                aren't separate projects - they're part of <strong>one career growth system</strong>.
              </p>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Our dual-engine platform combines battle-tested resume optimization with authentic LinkedIn authority building. 
                The same AI that gets your resume past the robots also helps you create content that positions you as the expert you already are.
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <p className="text-lg font-semibold text-slate-800 mb-2">The Result?</p>
                <p className="text-slate-600">
                  You don't just land your next role - you build the reputation that makes future opportunities come to you.
                </p>
              </div>
            </div>
          </div>

          {/* Solution Features */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">ATS-Optimized Resumes</h3>
                </div>
                <p className="text-slate-600">Beat the robots with AI-powered resume optimization that gets you past ATS systems and in front of hiring managers.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">LinkedIn Authority Building</h3>
                </div>
                <p className="text-slate-600">Generate authentic content that builds real authority while you focus on your actual work. No more writer's block.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Integrated Growth Loop</h3>
                </div>
                <p className="text-slate-600">The better your role, the stronger your content becomes. The stronger your content, the better your opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;