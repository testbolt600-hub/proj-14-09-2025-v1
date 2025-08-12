import React, { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const CTA = () => {
  const [ref, isInView] = useInView();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15)_0%,transparent_50%)]"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={ref} className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-50 mb-6">
            Ready to Level-Up Your <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">LinkedIn Game?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join our newsletter for exclusive LinkedIn growth tips, content strategies, and product updates.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full pl-12 pr-4 py-4 bg-[#111827] border border-gray-700 rounded-xl text-gray-50 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300"
              />
            </div>
            
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
            >
              Subscribe
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;