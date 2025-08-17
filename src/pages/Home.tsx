import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import Benefits from '../components/Benefits';
import SocialProof from '../components/SocialProof';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Benefits />
      <SocialProof />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Home;