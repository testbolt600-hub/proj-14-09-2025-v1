import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-[#040715]/80 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-50">Supergrow.ai</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#templates" className="text-gray-300 hover:text-white transition-colors">Templates</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#blog" className="text-gray-300 hover:text-white transition-colors">Blog</a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigate('/signin')}
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Start Growing Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#111827]/95 backdrop-blur-md border-t border-gray-700">
            <nav className="flex flex-col p-4 space-y-4">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#templates" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Templates</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</a>
              <a href="#blog" className="text-gray-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Blog</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                <button 
                  onClick={() => {
                    navigate('/signin');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-left"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    navigate('/signup');
                    setIsMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
                >
                Start Growing Free
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;