import React from 'react';
import { Eye, Lightbulb, List, BarChart3, User, Trophy } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Templates = () => {
  const [ref, isInView] = useInView();

  const templates = [
    { name: "Thought Leadership", icon: <Lightbulb className="w-6 h-6" />, color: "from-indigo-500 to-blue-500" },
    { name: "Listicle", icon: <List className="w-6 h-6" />, color: "from-violet-500 to-purple-500" },
    { name: "Case Study", icon: <BarChart3 className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
    { name: "Personal Story", icon: <User className="w-6 h-6" />, color: "from-pink-500 to-rose-500" },
    { name: "Achievement", icon: <Trophy className="w-6 h-6" />, color: "from-rose-500 to-orange-500" },
    { name: "Tips & Tricks", icon: <Lightbulb className="w-6 h-6" />, color: "from-orange-500 to-yellow-500" },
  ];

  return (
    <section id="templates" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Professional <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Templates</span> That Convert
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose from our library of proven templates designed to maximize engagement and build authority
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${template.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {template.icon}
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {template.name}
              </h3>
              
              <p className="text-slate-600 text-sm">
                Professional template designed for maximum engagement and authority building
              </p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold">
            <Eye className="w-5 h-5" />
            <span>50+ more templates available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Templates;