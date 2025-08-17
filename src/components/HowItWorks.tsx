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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-6">
            Create Perfect Content in <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Step Number */}
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/25">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                
                {/* Connecting Line (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 opacity-30 transform translate-x-10"></div>
                )}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-[#111827] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700/50">
                <div className="text-indigo-400">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-50 mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;