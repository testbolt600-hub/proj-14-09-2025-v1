import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        
        {/* Main icon - Career ladder/growth symbol */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-3/5 h-3/5 text-white relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Career ladder steps */}
          <path 
            d="M6 20h3v-2H6v2zm0-4h3v-2H6v2zm0-4h3v-2H6v2zm0-4h3V6H6v2z" 
            fill="currentColor"
          />
          <path 
            d="M12 20h3v-2h-3v2zm0-4h3v-2h-3v2zm0-4h3v-2h-3v2zm0-4h3V6h-3v2z" 
            fill="currentColor"
          />
          {/* Upward arrow indicating growth */}
          <path 
            d="M18 12l-1.41-1.41L15 12.17V4h-2v8.17l-1.59-1.58L10 12l4 4 4-4z" 
            fill="currentColor"
            transform="rotate(180 14 8)"
          />
        </svg>
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent`}>
          Career Clarified
        </span>
      )}
    </div>
  );
};

export default Logo;