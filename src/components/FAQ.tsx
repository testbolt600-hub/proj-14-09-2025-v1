import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const FAQ = () => {
  const [ref, isInView] = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is this different from other resume builders?",
      answer: "Most tools just format your resume. We optimize it for the specific ATS systems companies actually use, PLUS we help you build the personal brand that makes recruiters seek you out. It's a complete career growth system, not just a resume tool."
    },
    {
      question: "I'm not a natural writer. Can this really help with LinkedIn content?",
      answer: "That's exactly why we built this. Our AI learns from thousands of high-performing posts and adapts to your expertise and voice. You don't need to be a writer - you just need to be an expert in what you do."
    },
    {
      question: "How quickly will I see results?",
      answer: "Resume optimization results appear immediately - you'll see exactly how your ATS score improves. For LinkedIn, most users see engagement increases within the first week. Career opportunities typically accelerate within 30-60 days as both systems work together."
    },
    {
      question: "What if I'm happy with my current job?",
      answer: "Perfect! Building your personal brand while you're employed is the smartest strategy. You'll be positioned for internal promotions, speaking opportunities, consulting offers, and when you do decide to make a move, opportunities will come to you."
    },
    {
      question: "Is this suitable for senior executives?",
      answer: "Absolutely. Senior executives often have the most to gain from strategic personal branding. Our platform adapts to your seniority level and industry, helping you build thought leadership that opens doors to board positions, speaking engagements, and executive opportunities."
    },
    {
      question: "What industries does this work for?",
      answer: "Our AI is trained on successful professionals across all major industries - tech, finance, healthcare, consulting, marketing, sales, and more. The platform adapts its recommendations based on your specific industry and role."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Questions? <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">We've Got Answers</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl border border-slate-200 overflow-hidden transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-slate-800 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;