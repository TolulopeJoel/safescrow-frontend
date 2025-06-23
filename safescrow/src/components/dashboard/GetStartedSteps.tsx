import React from 'react';

const steps = [
  { label: 'Watch the tutorial', action: 'Watch' },
  { label: 'Fund your wallet', action: 'Fund' },
  { label: 'Create your first order', action: 'Create' },
  { label: 'Set up a transactional pin', action: 'Start' },
  { label: 'Refer a friend and earn reward', action: 'Invite' },
];

const GetStartedSteps: React.FC = () => (
  <div className="bg-white rounded-xl p-6 shadow w-full max-w-md">
    <div className="mb-4">
      <div className="text-sm font-medium mb-1">Get started in 5 Steps</div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div className="bg-primary-600 h-2 rounded-full" style={{ width: '0%' }}></div>
      </div>
      <div className="text-xs text-gray-500">0% done</div>
    </div>
    <ul className="space-y-3">
      {steps.map((step) => (
        <li key={step.label} className="flex items-center justify-between text-sm">
          <span>{step.label}</span>
          <button type="button" className="text-primary-600 font-medium hover:underline">{step.action}</button>
        </li>
      ))}
    </ul>
  </div>
);

export default GetStartedSteps; 