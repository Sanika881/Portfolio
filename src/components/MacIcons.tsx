import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Finder Icon (Authentic macOS split-face smiling icon)
export const FinderIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="finder-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4BB6FF" />
        <stop offset="50%" stopColor="#1E80F0" />
        <stop offset="100%" stopColor="#0B56D0" />
      </linearGradient>
      <linearGradient id="finder-face-left" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#CCE6FF" />
      </linearGradient>
      <linearGradient id="finder-face-right" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8AC6FF" />
        <stop offset="100%" stopColor="#4899F5" />
      </linearGradient>
      <filter id="finder-inner-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Squircle base */}
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#finder-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    
    {/* Left Face Half */}
    <path
      d="M20 22 C34 22 47 22 50 22 L50 68 C45 74 34 78 20 78 C20 78 18 50 20 22 Z"
      fill="url(#finder-face-left)"
      filter="url(#finder-inner-shadow)"
    />
    
    {/* Right Face Half */}
    <path
      d="M50 22 C53 22 66 22 80 22 C82 50 80 78 80 78 C66 78 55 74 50 68 L50 22 Z"
      fill="url(#finder-face-right)"
    />

    {/* Center Dividing Nose Line */}
    <path
      d="M50 22 C51 35 52 46 56 50 C51 52 49 53 50 68"
      stroke="#0B3C8A"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Eyes */}
    <circle cx="34" cy="40" r="4" fill="#0B3C8A" />
    <circle cx="66" cy="40" r="4" fill="#0B3C8A" />
    
    {/* Smile */}
    <path
      d="M28 58 C38 72 62 72 72 58"
      stroke="#0B3C8A"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

// 2. System Settings / Preferences Icon (Authentic macOS brushed metallic gear)
export const SystemSettingsIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="settings-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7E8288" />
        <stop offset="50%" stopColor="#53565C" />
        <stop offset="100%" stopColor="#37393D" />
      </linearGradient>
      <linearGradient id="gear-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DDE1E5" />
        <stop offset="100%" stopColor="#9CA0A6" />
      </linearGradient>
      <radialGradient id="gear-center" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#53565C" />
        <stop offset="100%" stopColor="#25272A" />
      </radialGradient>
    </defs>
    {/* Squircle base */}
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#settings-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    
    {/* Big Gear */}
    <g transform="translate(50, 50)">
      {/* 8 Gear Teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <rect
          key={idx}
          x="-5.5"
          y="-33"
          width="11"
          height="12"
          rx="2.5"
          fill="url(#gear-grad)"
          transform={`rotate(${angle})`}
        />
      ))}
      {/* Gear Main Disc */}
      <circle r="26" fill="url(#gear-grad)" />
      {/* Outer Rim Highlight */}
      <circle r="24" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      {/* Gear Inner Hole */}
      <circle r="12" fill="url(#gear-center)" />
      <circle r="12" stroke="rgba(0,0,0,0.5)" strokeWidth="1" fill="none" />
    </g>
  </svg>
);

// 3. Safari Icon (macOS Compass)
export const SafariIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="safari-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E4E7EB" />
      </linearGradient>
      <radialGradient id="compass-dial" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#48A8F8" />
        <stop offset="70%" stopColor="#1C73E8" />
        <stop offset="100%" stopColor="#0B4BB8" />
      </radialGradient>
      <linearGradient id="needle-red" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF4B4B" />
        <stop offset="100%" stopColor="#D91616" />
      </linearGradient>
      <linearGradient id="needle-white" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E4E8" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#safari-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
    
    {/* Compass Outer Ring */}
    <circle cx="50" cy="50" r="37" fill="url(#compass-dial)" />
    <circle cx="50" cy="50" r="37" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
    
    {/* Compass Degree Ticks */}
    <g transform="translate(50, 50)">
      {Array.from({ length: 36 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="-34"
          x2="0"
          y2={i % 9 === 0 ? '-28' : '-31'}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth={i % 9 === 0 ? '1.5' : '0.8'}
          transform={`rotate(${i * 10})`}
        />
      ))}
    </g>

    {/* Needle (rotated 45deg) */}
    <g transform="translate(50, 50) rotate(45)">
      {/* Red Half (North) */}
      <polygon points="0,-32 5,0 -5,0" fill="url(#needle-red)" />
      {/* White Half (South) */}
      <polygon points="0,32 5,0 -5,0" fill="url(#needle-white)" />
      {/* Center Pivot */}
      <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
      <circle cx="0" cy="0" r="1.5" fill="#888888" />
    </g>
  </svg>
);

// 4. Notes Icon (macOS Yellow Notepad with ruled lines)
export const NotesIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="notes-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF2A3" />
        <stop offset="100%" stopColor="#F9DF6A" />
      </linearGradient>
      <linearGradient id="notes-header" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFCC33" />
        <stop offset="100%" stopColor="#E6A800" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#notes-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

    {/* Top Yellow Header Band */}
    <path
      d="M2 24 C2 11.85 11.85 2 24 2 L76 2 C88.15 2 98 11.85 98 24 L98 28 L2 28 Z"
      fill="url(#notes-header)"
    />
    <line x1="2" y1="28" x2="98" y2="28" stroke="#D19800" strokeWidth="1" />

    {/* Perforation holes */}
    <circle cx="16" cy="15" r="2.5" fill="#C98B00" />
    <circle cx="30" cy="15" r="2.5" fill="#C98B00" />
    <circle cx="44" cy="15" r="2.5" fill="#C98B00" />
    <circle cx="58" cy="15" r="2.5" fill="#C98B00" />
    <circle cx="72" cy="15" r="2.5" fill="#C98B00" />
    <circle cx="86" cy="15" r="2.5" fill="#C98B00" />

    {/* Ruled horizontal lines */}
    <line x1="12" y1="42" x2="88" y2="42" stroke="#E6C850" strokeWidth="1.2" />
    <line x1="12" y1="56" x2="88" y2="56" stroke="#E6C850" strokeWidth="1.2" />
    <line x1="12" y1="70" x2="88" y2="70" stroke="#E6C850" strokeWidth="1.2" />
    <line x1="12" y1="84" x2="88" y2="84" stroke="#E6C850" strokeWidth="1.2" />

    {/* Simulated handwriting notes */}
    <path d="M16 38 Q32 37 46 38" stroke="#333333" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 52 Q40 50 68 52" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 66 Q28 65 38 66" stroke="#666666" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 5. Terminal Icon (macOS Terminal)
export const TerminalIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="term-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2D2F33" />
        <stop offset="50%" stopColor="#1E2024" />
        <stop offset="100%" stopColor="#111215" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#term-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    
    {/* Inner window bezel */}
    <rect x="9" y="10" width="82" height="80" rx="14" fill="#0D0E10" />

    {/* Prompt: >_ */}
    <path
      d="M22 36 L36 48 L22 60"
      stroke="#38EF7D"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="44" y="55" width="16" height="5" rx="2" fill="#FFFFFF" />
  </svg>
);

// 6. Mail Icon (macOS Sky Blue Envelope)
export const MailIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="mail-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5AC8FA" />
        <stop offset="100%" stopColor="#007AFF" />
      </linearGradient>
      <linearGradient id="mail-env" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E8ECF2" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#mail-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    
    {/* Clean White Folded Envelope */}
    <g transform="translate(18, 28)">
      {/* Envelope Back/Body */}
      <rect x="0" y="0" width="64" height="44" rx="6" fill="url(#mail-env)" />
      {/* Envelope Flap Lines */}
      <path
        d="M2 3 L32 26 L62 3"
        stroke="#BDC4D0"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2 42 L24 23 M62 42 L40 23"
        stroke="#D2D8E2"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

// 7. Photos / Gallery Icon (macOS Colorful Petal Wheel)
export const PhotosIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="photos-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#EDEDED" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#photos-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />

    {/* 8 Flower Petals with macOS vibrant colors */}
    <g transform="translate(50, 50)">
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#FF2D55" opacity="0.88" />
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#FF9500" opacity="0.88" transform="rotate(45)" />
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#FFCC00" opacity="0.88" transform="rotate(90)" />
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#4CD964" opacity="0.88" transform="rotate(135)" />
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#5AC8FA" opacity="0.88" transform="rotate(180)" />
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#007AFF" opacity="0.88" transform="rotate(225)" />
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#5856D6" opacity="0.88" transform="rotate(270)" />
      <ellipse cx="0" cy="-21" rx="8" ry="17" fill="#AF52DE" opacity="0.88" transform="rotate(315)" />
      <circle cx="0" cy="0" r="7" fill="#FFFFFF" />
    </g>
  </svg>
);

// 8. Projects / App Store / Launchpad Icon
export const ProjectsMacIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="proj-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1E88E5" />
        <stop offset="100%" stopColor="#1565C0" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#proj-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

    {/* Crossed Pencil, Ruler, Paintbrush (Mac App Store / Builder Icon) */}
    <g transform="translate(50, 50)" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="-24" y1="24" x2="24" y2="-24" />
      <line x1="24" y1="24" x2="-24" y2="-24" />
      <line x1="0" y1="-28" x2="0" y2="28" />
    </g>
  </svg>
);

// 9. GitHub Mac Icon
export const GithubMacIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gh-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#333333" />
        <stop offset="100%" stopColor="#181818" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#gh-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    
    <path
      d="M50 20 C33.4 20 20 33.4 20 50 C20 63.3 28.6 74.5 40.6 78.5 C42.1 78.8 42.6 77.8 42.6 77 C42.6 76.3 42.6 74.2 42.6 71.6 C34.2 73.4 32.5 67.6 32.5 67.6 C31.1 64.1 29.2 63.1 29.2 63.1 C26.5 61.2 29.4 61.3 29.4 61.3 C32.4 61.5 34 64.4 34 64.4 C36.7 69 41 67.7 42.7 66.9 C43 64.9 43.8 63.5 44.7 62.7 C38 61.9 31 59.3 31 47.7 C31 44.4 32.2 41.7 34.1 39.6 C33.8 38.8 32.8 35.7 34.4 31.5 C34.4 31.5 36.9 30.7 42.7 34.6 C45.1 33.9 47.6 33.6 50.1 33.6 C52.6 33.6 55.1 33.9 57.5 34.6 C63.3 30.7 65.8 31.5 65.8 31.5 C67.4 35.7 66.4 38.8 66.1 39.6 C68 41.7 69.2 44.4 69.2 47.7 C69.2 59.3 62.2 61.9 55.4 62.6 C56.5 63.5 57.5 65.4 57.5 68.3 C57.5 72.4 57.5 75.8 57.5 76.8 C57.5 77.6 58 78.6 59.5 78.3 C71.4 74.3 80 63.2 80 50 C80 33.4 66.6 20 50 20 Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 10. LinkedIn Mac Icon
export const LinkedinMacIcon: React.FC<IconProps> = ({ className = '', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="li-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0A66C2" />
        <stop offset="100%" stopColor="#004182" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#li-bg)" />
    <rect x="2.5" y="2.5" width="95" height="95" rx="21.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    
    <g fill="#FFFFFF">
      {/* "in" */}
      <circle cx="34" cy="34" r="5" />
      <rect x="29" y="44" width="10" height="28" rx="2" />
      <path d="M48 44 L58 44 L58 49 C59.8 45.8 63.8 43.2 70 43.2 C79 43.2 82 48.5 82 58 L82 72 L72 72 L72 59.5 C72 55.5 70.8 52.5 66.5 52.5 C62.5 52.5 60.5 55.2 60.5 59.5 L60.5 72 L50.5 72 L50.5 44 Z" />
    </g>
  </svg>
);

// 11. Authentic macOS Folder Icon (with realistic Monterey/Sonoma geometry, tab and flap)
export const MacFolderIcon: React.FC<{ color?: string; size?: number; className?: string }> = ({
  color = '#8DC8F8',
  size = 54,
  className = '',
}) => (
  <svg
    width={size}
    height={Math.round(size * 0.82)}
    viewBox="0 0 100 82"
    className={`drop-shadow-[0_4px_8px_rgba(0,0,0,0.14)] select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id={`folder-back-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} stopOpacity="0.75" />
      </linearGradient>
      <linearGradient id={`folder-front-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="10%" stopColor={color} />
        <stop offset="100%" stopColor={color} stopOpacity="0.9" />
      </linearGradient>
    </defs>
    {/* Back tab */}
    <path
      d="M6 14 C6 8.5 10.5 4 16 4 L38 4 C42 4 45 6.5 48 10 L52 15 C54 17.5 57 19 61 19 L84 19 C89.5 19 94 23.5 94 29 L94 40 L6 40 Z"
      fill={`url(#folder-back-${color})`}
      filter="brightness(0.88)"
    />
    {/* Folder Body Front Pocket */}
    <rect
      x="5"
      y="22"
      width="90"
      height="56"
      rx="9"
      fill={`url(#folder-front-${color})`}
    />
    <rect
      x="5.5"
      y="22.5"
      width="89"
      height="55"
      rx="8.5"
      stroke="rgba(255,255,255,0.45)"
      strokeWidth="1"
    />
    {/* Subtle folder paper line inside */}
    <path
      d="M16 26 L84 26"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
