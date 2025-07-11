import React from 'react';

interface ProgressBarProps {
  progress: string; // e.g., '33%', '66%', '100%'
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    <div className="h-3 w-full bg-primary-100 rounded-lg">
      <div
        className="h-3 bg-primary-600 rounded-lg transition-all duration-300"
        style={{ width: progress }}
      />
    </div>
  </div>
);

export default ProgressBar; 