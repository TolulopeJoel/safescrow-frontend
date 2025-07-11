import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold mb-1" htmlFor={props.name}>
        {label}
      </label>
    )}
    <textarea
      id={props.name}
      className={`mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary-200 ${className} ${error ? 'border-red-400' : ''}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default FormTextarea; 