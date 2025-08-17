import React from 'react';
import { Palette, PenTool, Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Features = () => {
  const [ref, isInView] = useInView();

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Stunning Carousels, No Design Skills Needed.",
      description: "Choose a template, add your text, and our AI will design a professional, engaging carousel ready to post.",
      gradient: "from-indigo-500 to-violet-500"
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "Beat Writer's Block Forever.",
      description: "Generate ideas, write compelling text posts from scratch, and repurpose content with our intelligent writing assistant.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Automate Your Growth.",
      description: "Plan your content calendar and schedule posts in advance to maintain consistency and maximize your reach.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Your All-in-One LinkedIn <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Content Toolkit</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 hover:border-indigo-300/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;