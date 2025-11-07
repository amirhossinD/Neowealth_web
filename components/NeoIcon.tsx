import React from 'react';

const NeoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.43L19.57 9L12 13.57L4.43 9L12 4.43ZM3 8.37L12 13.1V20L3 14.63V8.37ZM21 8.37V14.63L12 20V13.1L21 8.37Z" fill="currentColor"/>
  </svg>
);

export default NeoIcon;
