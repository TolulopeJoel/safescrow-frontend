import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
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
    <input
      id={props.name}
      className={`mt-2 w-full border border-gray-300 text-sm rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary-200 ${className} ${error ? 'border-red-400' : ''}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default FormInput; 