import React from 'react';
import { Linkedin, Twitter, Youtube, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white relative">
      {/* Gradient glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Logo showText={true} />
            </div>
            <p className="text-slate-300 mb-6">
              AI-powered career growth platform for professionals, job seekers, and brand builders.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Linkedin className="w-5 h-5 text-slate-300 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Twitter className="w-5 h-5 text-slate-300 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Youtube className="w-5 h-5 text-slate-300 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                <Mail className="w-5 h-5 text-slate-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#benefits" className="text-slate-300 hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Free Tools</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#success-stories" className="text-slate-300 hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Career Guides</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Resume Templates</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">LinkedIn Strategies</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400">© 2025 Supergrow.ai | Built with 🧠 by AI</p>
          <p className="text-slate-400 mt-4 md:mt-0">Made with ❤️ for career growth</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;