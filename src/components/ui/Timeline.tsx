import React from 'react';

interface TimelineEvent {
  date?: string;
  label: string;
  desc: string;
  color: string;
  current?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ events, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
    <h3 className="text-sm font-semibold text-gray-900 mb-4">Order Timeline</h3>
    <ol className="relative border-l border-gray-200 ml-2">
      {events.map((event, idx) => (
        <li key={idx} className={`mb-6 ml-4 ${event.current ? 'font-bold text-primary-700' : ''}`}>
          <div className={`absolute w-2.5 h-2.5 rounded-full -left-1.5 border-2 border-white ${event.current ? 'bg-primary-700' : `bg-${event.color}`}`}></div>
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

export default Timeline; 