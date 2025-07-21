import React from 'react';

interface TimelineEvent {
  date?: string;
  label: string;
  desc: string;
  current?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
  currentIndex?: number; // Optional: can be inferred from events
}

const Timeline: React.FC<TimelineProps> = ({ events, className = '', currentIndex }) => {
  // Find the current step index if not provided
  let current = typeof currentIndex === 'number'
    ? currentIndex
    : events.findIndex(e => e.current);
  if (current === -1) current = 0;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Timeline</h3>
      <ol className="relative border-l border-gray-200 ml-2">
        {events.map((event, idx) => (
          <li key={idx} className={`mb-6 ml-4 ${idx === current ? 'font-bold text-primary-700' : ''}`}>
            <div className="absolute -left-2.5">
              {idx < current ? (
                <span className={`flex items-center justify-center w-5 h-5 rounded-full bg-primary-600 text-white border-2 border-primary-600`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
              ) : idx === current ? (
                <span className={`flex items-center justify-center w-5 h-5 rounded-full border-2 border-primary-700 bg-white`}></span>
              ) : (
                <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></span>
              )}
            </div>
            <div>
              {event.date && (
                <time className="mb-1 text-xs font-normal leading-none text-gray-400">{event.date}</time>
              )}
              <div className="text-sm font-medium text-gray-900">{event.label}</div>
              <div className="text-xs text-gray-500">{event.desc}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline; 