import React from 'react';
import { FileCheck, Lightbulb, RotateCcw, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Benefits = () => {
  const [ref, isInView] = useInView();

  const benefits = [
    {
      icon: FileCheck,
      title: "Beat The ATS Systems That Reject 75% of Resumes",
      description: "Our AI analyzes your resume against 1,000+ ATS patterns, then rewrites it to pass the robots AND impress humans. No more qualified applications disappearing into the void.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-100",
      features: [
        "ATS compatibility analysis",
        "Keyword optimization",
        "Format standardization",
        "Human readability check"
      ]
    },
    {
      icon: Lightbulb,
      title: "Build LinkedIn Authority Without the Content Creation Burnout",
      description: "Generate authentic posts in minutes, not hours. Our AI learns your voice and expertise, then helps you create content that builds real authority while you focus on your actual work.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-100",
      features: [
        "AI content generation",
        "Voice matching technology",
        "Engagement optimization",
        "Consistent posting schedule"
      ]
    },
    {
      icon: RotateCcw,
      title: "Create Your Career Growth Loop (The Secret Weapon)",
      description: "Here's what most people miss: the better your role, the stronger your content becomes. The stronger your content, the better your opportunities. We optimize both sides of this loop.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-100",
      features: [
        "Integrated career strategy",
        "Compound growth effects",
        "Opportunity magnetism",
        "Long-term positioning"
      ]
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Three Game-Changing Benefits That <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Transform Careers</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`group bg-gradient-to-br ${benefit.bgGradient} rounded-2xl p-8 border ${benefit.borderColor} hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  {benefit.description}
                </p>

                <div className="space-y-3">
                  {benefit.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;