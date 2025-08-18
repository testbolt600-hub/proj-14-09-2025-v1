import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Testimonials = () => {
  const [ref, isInView] = useInView();

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Marketing Director",
      company: "TechFlow",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "I was stuck in the same role for 3 years. Within 6 weeks of using Career Clarified, I had interviews at 3 companies and landed a 40% salary increase. The resume optimization was like having a secret weapon.",
      rating: 5,
      result: "40% salary increase"
    },
    {
      name: "Marcus Rodriguez",
      title: "Business Consultant",
      company: "Independent",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "My LinkedIn posts went from 50 likes to 2,000+ views consistently. More importantly, I've generated $120K in new business from connections made through my content. This platform changed everything.",
      rating: 5,
      result: "$120K new business"
    },
    {
      name: "Jennifer Walsh",
      title: "Software Engineer",
      company: "Microsoft",
      image: "https://images.pexels.com/photos/3206080/pexels-photo-3206080.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Finally broke through the ATS nightmare. Got callbacks from Google, Microsoft, and Amazon using their optimized resume. The best part? I barely had to think about it - the AI did the heavy lifting.",
      rating: 5,
      result: "3 FAANG interviews"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            What Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Users Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="flex items-center gap-1 mb-6">
                <Quote className="w-6 h-6 text-indigo-500" />
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p className="text-slate-600 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Result Badge */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 mb-6 border border-green-100">
                <div className="text-green-700 font-semibold text-sm">Result: {testimonial.result}</div>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-slate-800 font-semibold">{testimonial.name}</h4>
                  <p className="text-slate-500 text-sm">{testimonial.title}</p>
                  <p className="text-slate-400 text-xs">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;