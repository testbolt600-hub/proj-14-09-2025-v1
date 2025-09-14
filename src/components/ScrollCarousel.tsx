import React, { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const ScrollCarousel = () => {
  const [ref, isInView] = useInView();
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const contentCarouselRef = useRef<HTMLDivElement>(null);

  const useCases = [
    {
      title: "AI-Powered Resume Optimization",
      desc: "Transform your resume with AI that understands ATS systems and recruiter preferences, ensuring your qualifications get noticed.",
      tags: ["AI"],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "LinkedIn Content Generation",
      desc: "Create authentic, engaging LinkedIn posts that build your professional authority and attract the right opportunities to your profile.",
      tags: ["Content"],
      image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Personal Brand Analytics",
      desc: "Track your professional growth with comprehensive analytics that show how your content and networking efforts translate to career opportunities.",
      tags: ["Analytics"],
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Smart Job Matching",
      desc: "Get matched with opportunities that align with your skills, experience, and career goals using our intelligent job discovery engine.",
      tags: ["Matching"],
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Interview Preparation",
      desc: "Practice with AI-powered mock interviews tailored to your target roles, with personalized feedback to improve your performance.",
      tags: ["Prep"],
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Network Intelligence",
      desc: "Discover and connect with the right professionals in your industry using AI-powered networking recommendations and relationship insights.",
      tags: ["Network"],
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      color: "from-violet-500 to-purple-600"
    },
    {
      title: "Career Path Planning",
      desc: "Get personalized career roadmaps with skill development recommendations and strategic guidance for reaching your professional goals.",
      tags: ["Planning"],
      image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      color: "from-pink-500 to-rose-600"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      const wrapperRect = wrapper.getBoundingClientRect();
      if (wrapperRect.bottom < 0 || wrapperRect.top > window.innerHeight) return;

      const scrollableHeight = wrapper.offsetHeight - window.innerHeight;
      const pixelsScrolled = Math.max(0, window.scrollY - wrapper.offsetTop);
      const progress = scrollableHeight > 0 ? pixelsScrolled / scrollableHeight : 0;
      
      let newActiveIndex = Math.floor(progress * useCases.length);
      newActiveIndex = Math.min(useCases.length - 1, Math.max(0, newActiveIndex));

      setActiveIndex(newActiveIndex);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const contentPanel = contentCarouselRef.current;
    const activeItem = contentRefs.current[activeIndex];

    if (contentPanel && activeItem) {
      const panelHeight = contentPanel.clientHeight;
      const itemHeight = activeItem.clientHeight;
      const itemOffsetTop = activeItem.offsetTop;

      const targetScrollTop = itemOffsetTop - (panelHeight / 2) + (itemHeight / 2);

      contentPanel.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  return (
    <section className="bg-slate-50">
      <div ref={ref} className={`transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <div 
          ref={scrollWrapperRef}
          className="relative"
          style={{ minHeight: '250vh' }}
        >
          <div className="sticky top-[10vh] h-[80vh] max-h-[700px] w-full max-w-6xl mx-auto flex items-stretch bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Left Panel - Content */}
            <div 
              ref={contentCarouselRef}
              className="flex-1 h-full px-6 py-12 lg:px-12 overflow-y-scroll scrollbar-hide"
            >
              {useCases.map((useCase, i) => (
                <div
                  key={useCase.title}
                  ref={el => contentRefs.current[i] = el}
                  className="h-[80vh] max-w-md flex flex-col justify-center transition-opacity duration-500"
                  style={{ opacity: activeIndex === i ? 1 : 0.3 }}
                >
                  <span className={`inline-block bg-gradient-to-r ${useCase.color} bg-clip-text text-transparent text-sm font-bold uppercase tracking-wider mb-4`}>
                    {useCase.tags[0]}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                    {useCase.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {useCase.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Panel - Image */}
            <div className="flex-1 h-full flex items-center justify-center p-12">
              <div className="w-full h-full bg-white rounded-2xl shadow-2xl relative overflow-hidden">
                {useCases.map((useCase, i) => (
                  <div
                    key={useCase.image}
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: activeIndex === i ? 1 : 0 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-20`}></div>
                    <img
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-section {
          scroll-margin-top: 120px;
        }
      `}</style>
    </section>
  );
};

export default ScrollCarousel;