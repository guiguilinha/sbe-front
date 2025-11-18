import React from 'react';

const ResultIllustrationPlaceholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center my-8">
    <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-100">
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-2 text-gray-400">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 32l8-8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
      <span className="text-gray-400 text-sm">Ilustração aqui</span>
    </div>
  </div>
);

export default ResultIllustrationPlaceholder; 