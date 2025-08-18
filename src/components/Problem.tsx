import React from 'react';
import { AlertCircle, Clock, Edit3 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Problem = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            If You're Qualified But Still Struggling, <span className="text-red-500">You're Not Alone</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Job Seekers Problem */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">For Job Seekers</h3>
              </div>
              
              <div className="space-y-4 text-slate-600 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></span>
                    Your resume disappears into the "ATS black hole\" while less qualified candidates get interviews
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></span>
                    You spend hours tailoring each application, only to hear nothing back
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0"></span>
                    The whole process feels like throwing darts in the dark
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Builders Problem */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">For Brand Builders</h3>
              </div>
              
              <div className="space-y-4 text-slate-600 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                    You know you should be posting on LinkedIn, but staring at that blank text box gives you instant writer's block
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                    You see others building authority while you struggle to find time for consistent content creation
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                    Your expertise stays hidden while louder voices get the opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Real Problem */}
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-slate-800">The Real Problem</h3>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              You're treating these as separate challenges when they're actually <strong>two sides of the same coin</strong>. 
              Landing great roles AND building influence requires an integrated approach that most professionals never discover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;