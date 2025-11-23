import React from 'react';

// Common colors mapped from tailwind config
const colors = {
  primary: '#1F2937',
  accent: '#8B5CF6',
  accentLight: '#DDD6FE',
  secondary: '#FEF3C7',
  skin1: '#E0AA94',
  skin2: '#5D4037',
  skin3: '#FFCCBC',
  white: '#FFFFFF',
};

export const HeroIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 500 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: colors.accentLight, stopOpacity: 0.5 }} />
        <stop offset="100%" style={{ stopColor: colors.secondary, stopOpacity: 0.5 }} />
      </linearGradient>
    </defs>
    
    {/* Background Shapes */}
    <circle cx="250" cy="200" r="180" fill="url(#grad1)" />
    <circle cx="100" cy="100" r="40" fill={colors.secondary} opacity="0.6" />
    <circle cx="400" cy="300" r="60" fill={colors.accentLight} opacity="0.6" />

    {/* Person 1 (Left) */}
    <g transform="translate(80, 120)">
      {/* Hair */}
      <path d="M40 20 C40 20 20 40 20 80 L90 80 C90 40 70 20 70 20 Z" fill={colors.primary} />
      {/* Face */}
      <circle cx="55" cy="60" r="25" fill={colors.skin1} />
      {/* Body */}
      <path d="M20 90 Q55 140 90 90 L90 200 L20 200 Z" fill={colors.accent} />
      {/* Laptop Back */}
      <rect x="50" y="130" width="80" height="60" rx="5" fill="#333" transform="rotate(-10 50 130)" />
    </g>

    {/* Person 2 (Right) */}
    <g transform="translate(280, 140)">
      {/* Hair */}
      <circle cx="55" cy="60" r="28" fill={colors.primary} />
      {/* Face */}
      <circle cx="55" cy="60" r="25" fill={colors.skin2} />
      {/* Body */}
      <path d="M20 90 Q55 140 90 90 L90 180 L20 180 Z" fill="#4B5563" />
      {/* Holding Tablet */}
      <rect x="10" y="110" width="50" height="70" rx="4" fill="#DDD" transform="rotate(15 35 145)" />
    </g>

    {/* Coding Bubble Central */}
    <g transform="translate(180, 60)">
      <rect x="0" y="0" width="140" height="100" rx="15" fill={colors.white} stroke={colors.primary} strokeWidth="2" />
      <circle cx="20" cy="20" r="5" fill="#FF5F56" />
      <circle cx="40" cy="20" r="5" fill="#FFBD2E" />
      <circle cx="60" cy="20" r="5" fill="#27C93F" />
      <rect x="20" y="40" width="80" height="8" rx="4" fill="#E5E7EB" />
      <rect x="20" y="60" width="100" height="8" rx="4" fill="#E5E7EB" />
      <rect x="20" y="80" width="60" height="8" rx="4" fill={colors.accent} />
    </g>
  </svg>
);

export const StudentIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="200" cy="200" r="160" fill="#F3F4F6" />
    
    {/* Body */}
    <path d="M120 320 L120 200 C120 200 140 160 200 160 C260 160 280 200 280 200 L280 320 Z" fill={colors.accent} />
    
    {/* Neck */}
    <rect x="185" y="140" width="30" height="40" fill={colors.skin3} />
    
    {/* Head */}
    <circle cx="200" cy="130" r="50" fill={colors.skin3} />
    
    {/* Hair */}
    <path d="M140 130 C140 70 260 70 260 130 C260 160 240 180 240 180 L160 180 C160 180 140 160 140 130" fill={colors.primary} />
    
    {/* Laptop Base */}
    <path d="M100 280 L300 280 L320 300 L80 300 Z" fill="#D1D5DB" />
    
    {/* Laptop Screen */}
    <path d="M110 280 L110 180 L290 180 L290 280 Z" fill="#374151" />
    
    {/* Code symbols floating */}
    <text x="80" y="150" fontSize="30" fill={colors.primary} fontFamily="monospace" fontWeight="bold">{`</>`}</text>
    <text x="280" y="120" fontSize="40" fill={colors.accent} fontFamily="monospace" fontWeight="bold">{`{}`}</text>
    <text x="300" y="250" fontSize="24" fill={colors.primary} fontFamily="monospace" fontWeight="bold">{`#`}</text>
  </svg>
);

export const IconGift: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="40" width="60" height="50" rx="4" fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
    <rect x="15" y="30" width="70" height="15" rx="2" fill={colors.accentLight} stroke={colors.primary} strokeWidth="2" />
    <rect x="45" y="30" width="10" height="60" fill={colors.accent} />
    <path d="M50 30 C50 30 30 10 20 30 L50 30 C50 30 70 10 80 30" fill="none" stroke={colors.accent} strokeWidth="4" />
  </svg>
);

export const IconBot: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="30" width="50" height="50" rx="8" fill={colors.accentLight} stroke={colors.primary} strokeWidth="2" />
    <circle cx="40" cy="50" r="5" fill={colors.primary} />
    <circle cx="60" cy="50" r="5" fill={colors.primary} />
    <rect x="40" y="65" width="20" height="4" rx="2" fill={colors.primary} />
    <line x1="50" y1="30" x2="50" y2="15" stroke={colors.primary} strokeWidth="2" />
    <circle cx="50" cy="12" r="4" fill={colors.accent} />
  </svg>
);

export const IconCommunity: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Person Center */}
    <circle cx="50" cy="40" r="15" fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
    <path d="M30 85 Q50 60 70 85" fill={colors.accent} stroke={colors.primary} strokeWidth="2" />
    {/* Person Left */}
    <circle cx="25" cy="50" r="12" fill={colors.accentLight} stroke={colors.primary} strokeWidth="2" />
    <path d="M10 90 Q25 70 40 90" fill={colors.primary} opacity="0.8" />
    {/* Person Right */}
    <circle cx="75" cy="50" r="12" fill={colors.accentLight} stroke={colors.primary} strokeWidth="2" />
    <path d="M60 90 Q75 70 90 90" fill={colors.primary} opacity="0.8" />
  </svg>
);