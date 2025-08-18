import React from 'react';
import { Edit3, Layout, Send } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const HowItWorks = () => {
  const [ref, isInView] = useInView();

  const steps = [
    {
      number: "1",
      icon: <Edit3 className="w-8 h-8" />,
      title: "Ideate & Write",
      description: "Start with an idea or let our AI suggest topics. Write and refine your post with our smart assistant."
    },
    {
      number: "2",
      icon: <Layout className="w-8 h-8" />,
      title: "Design & Visualize",
      description: "Instantly turn your text into a beautiful carousel using our professionally designed templates."
    },
    {
      number: "3",
      icon: <Send className="w-8 h-8" />,
      title: "Schedule & Grow",
      description: "Schedule your post for the perfect time and watch your personal brand grow on autopilot."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            How It <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Three simple steps to transform your career and build unstoppable authority on LinkedIn
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <div className="text-indigo-600">
                    {step.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connection Lines */}
        <div className="hidden md:block mt-16">
          <div className="flex items-center justify-center">
            <div className="w-32 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;