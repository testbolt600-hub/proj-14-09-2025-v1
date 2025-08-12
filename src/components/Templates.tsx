import React from 'react';
import { Eye, TrendingUp, FileText, User, Target, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Templates = () => {
  const [ref, isInView] = useInView();

  const templates = [
    { name: "Thought Leadership", icon: <TrendingUp className="w-6 h-6" />, color: "from-indigo-500 to-blue-500" },
    { name: "Listicle", icon: <FileText className="w-6 h-6" />, color: "from-violet-500 to-purple-500" },
    { name: "Case Study", icon: <Target className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
    { name: "Personal Story", icon: <User className="w-6 h-6" />, color: "from-pink-500 to-rose-500" },
    { name: "Achievement", icon: <Award className="w-6 h-6" />, color: "from-rose-500 to-orange-500" },
    { name: "Tips & Tricks", icon: <TrendingUp className="w-6 h-6" />, color: "from-orange-500 to-yellow-500" },
  ];

  return (
    <section id="templates" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.08)_0%,transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-6">
            Templates for Every <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Professional Niche</span>
          </h2>
        </div>

        <div className="relative">
          {/* Fade gradients on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#040715] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#040715] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {templates.map((template, index) => (
              <div
                key={index}
                className={`group flex-none w-80 h-64 bg-[#111827] rounded-2xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:rotate-1 cursor-pointer ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {template.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-50 mb-2">{template.name}</h3>
                    <p className="text-gray-400 text-sm">Professional template designed for maximum engagement</p>
                  </div>
                  
                  <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors group-hover:translate-x-2 duration-300">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">Preview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;