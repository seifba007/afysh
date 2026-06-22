import React from 'react';

export default function Logo({ size = 40, showText = true }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#20336B" />
        <path d="M50 18 L82 75 L68 75 L50 42 L32 75 L18 75 Z" fill="#FAF7EF" />
        <rect x="18" y="68" width="64" height="14" rx="3" fill="#D63B27" />
        <rect x="26" y="72" width="48" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
      </svg>
      {showText && (
        <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: size * 0.65, fontWeight: 600, color: '#20336B', letterSpacing: '-0.5px' }}>
          Afych
        </span>
      )}
    </div>
  );
}
