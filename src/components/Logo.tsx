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
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-1/2 h-1/2 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
            fill="currentColor"
          />
          <path 
            d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" 
            fill="currentColor" 
            opacity="0.7"
          />
          <path 
            d="M5 6L5.5 8L7 8.5L5.5 9L5 11L4.5 9L3 8.5L4.5 8L5 6Z" 
            fill="currentColor" 
            opacity="0.7"
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