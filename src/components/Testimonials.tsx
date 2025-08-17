import React from 'react';
import { Star, Linkedin } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Testimonials = () => {
  const [ref, isInView] = useInView();

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Founder @ TechFlow",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Career Clarified transformed my LinkedIn presence completely. I went from 500 followers to 15,000 in just 6 months. The AI carousel generator is pure magic!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      title: "VP Marketing @ ScaleUp",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The content quality is incredible. I used to spend hours crafting posts, now I create engaging content in minutes. My engagement rates have tripled.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      title: "Product Manager @ InnovateCorp",
      image: "https://images.pexels.com/photos/3206080/pexels-photo-3206080.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "The scheduling feature is a game-changer. I plan my entire month's content in one sitting. Consistency has never been easier to maintain.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-6">
            Loved by <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Professionals</span> on LinkedIn
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-[#111827] backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-gray-50 font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
                <Linkedin className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;