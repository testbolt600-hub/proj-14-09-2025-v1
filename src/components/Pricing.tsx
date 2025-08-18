import React from 'react';
import { Check, Sparkles, Star, Building2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Pricing = () => {
  const [ref, isInView] = useInView();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      icon: <Sparkles className="w-6 h-6" />,
      features: [
        "5 AI-generated posts per month",
        "3 carousel templates",
        "Basic scheduling",
        "Community support"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For serious content creators",
      icon: <Star className="w-6 h-6" />,
      features: [
        "Unlimited AI-generated content",
        "50+ professional templates",
        "Advanced scheduling & analytics",
        "Priority support",
        "Custom brand templates",
        "LinkedIn engagement insights"
      ],
      buttonText: "Choose Pro",
      buttonVariant: "gradient",
      popular: true
    },
    {
      name: "Business",
      price: "$99",
      period: "per month",
      description: "For teams and agencies",
      icon: <Building2 className="w-6 h-6" />,
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "White-label solutions",
        "Advanced analytics dashboard",
        "Custom integrations",
        "Dedicated account manager"
      ],
      buttonText: "Choose Business",
      buttonVariant: "outline"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-indigo-50/20 to-pink-50/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Find the Perfect Plan for Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Growth</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:border-indigo-400/50 hover:shadow-indigo-500/20 ${
                plan.popular 
                  ? 'border-indigo-400 shadow-lg shadow-indigo-500/20' 
                  : 'border-slate-200/50'
              } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600' 
                    : 'bg-slate-200'
                }`}>
                  <div className={plan.popular ? 'text-white' : 'text-slate-600'}>
                    {plan.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-slate-600">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                plan.buttonVariant === 'gradient'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105'
                  : 'border border-slate-300 text-slate-700 hover:border-indigo-400 hover:text-indigo-600'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;