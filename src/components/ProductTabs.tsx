import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Briefcase, CreditCard } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const ProductTabs = () => {
  const [ref, isInView] = useInView();
  const [activeTab, setActiveTab] = useState('career-growth');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const tabs = [
    {
      id: 'career-growth',
      name: 'Career Growth',
      icon: Users,
      title: 'Accelerate your career with AI-powered growth',
      description: 'Build a stronger professional presence with less effort. Career Clarified streamlines resume optimization, LinkedIn content creation, and personal branding — so you can attract better opportunities.',
      features: ['Resume Optimization', 'LinkedIn Content', 'Personal Branding', 'Job Matching', 'Interview Prep'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'content-creation',
      name: 'Content Creation',
      icon: Briefcase,
      title: 'Professional content creation, made simple',
      description: 'Create engaging LinkedIn content that builds authority and drives engagement. Our AI helps you maintain consistent posting while developing your unique voice and expertise.',
      features: ['AI Post Generation', 'Carousel Design', 'Content Calendar', 'Engagement Analytics', 'Brand Voice'],
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 'networking',
      name: 'Smart Networking',
      icon: CreditCard,
      title: 'Strategic networking for career advancement',
      description: 'Build meaningful professional relationships through intelligent networking strategies. Connect with the right people, engage authentically, and expand your influence in your industry.',
      features: ['Network Analysis', 'Connection Strategy', 'Event Discovery', 'Relationship Tracking', 'Influence Building'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(sectionRefs.current).filter(Boolean);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          const sectionId = Object.keys(sectionRefs.current).find(
            key => sectionRefs.current[key] === section
          );
          if (sectionId && sectionId !== activeTab) {
            setActiveTab(sectionId);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const section = sectionRefs.current[tabId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">Products</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Connect your career, content, and <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">professional growth</span>
          </h2>
        </div>

        {/* Sticky Tab Navigation */}
        <div className={`sticky top-4 z-10 mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/50 shadow-lg max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full text-center py-4 px-4 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-slate-100 text-slate-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${activeTab === tab.id ? tab.iconColor : 'text-slate-400'}`} />
                    <span className="text-sm">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-32">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <section
                key={tab.id}
                id={tab.id}
                ref={el => sectionRefs.current[tab.id] = el}
                className={`scroll-section transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.3}s` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="p-8 lg:p-12 order-2 lg:order-1">
                    <div className="flex items-center mb-6">
                      <div className={`w-6 h-6 rounded-lg ${tab.bgColor} flex items-center justify-center mr-3`}>
                        <Icon className={`w-4 h-4 ${tab.iconColor}`} />
                      </div>
                      <span className="text-base font-medium text-slate-500">{tab.name}</span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                      {tab.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                      {tab.description}
                    </p>
                    
                    <button className="inline-flex items-center font-semibold text-slate-800 group hover:text-indigo-600 transition-colors mb-8">
                      Learn more
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                    
                    <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-3">
                      {tab.features.map((feature, featureIndex) => (
                        <span
                          key={feature}
                          className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                            featureIndex === 0
                              ? `text-slate-800 ${tab.bgColor} font-medium border border-slate-300`
                              : 'text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-80 lg:h-96 order-1 lg:order-2 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tab.color} opacity-10`}></div>
                    <img
                      src={tab.image}
                      alt={`${tab.name} illustration`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;