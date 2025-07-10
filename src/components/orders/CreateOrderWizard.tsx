import React, { useState } from 'react';

const CreateOrderWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    email: '',
    phone: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = 'Required';
    if (!form.email) newErrors.email = 'Required';
    if (!form.phone) newErrors.phone = 'Required';
    if (!form.description) newErrors.description = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    }
  };

  // Placeholder for Back/Cancel handlers
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleCancel = () => {
    // Implement navigation or reset logic
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFF]">
      {/* Topbar placeholder */}
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 text-sm" onClick={handleBack}>&larr; Back</button>
        </div>
        <button className="text-red-500 text-sm font-medium" onClick={handleCancel}>
          Cancel <span className="text-xl font-light ml-1">&times;</span>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-10">
          <h2 className="text-center text-2xl font-semibold mb-1">Create order</h2>
          <p className="text-center text-gray-500 text-sm mb-6">Fill in the details to initiate a transaction</p>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-1 w-full bg-orange-100 rounded">
              <div className="h-1 bg-orange-400 rounded transition-all duration-300" style={{ width: '33%' }} />
            </div>
          </div>
          {/* Step 1: Order Details */}
          {step === 1 && (
            <form className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Order details</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g Software development"
                  value={form.title}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Buyer's email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Buyer's phone number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Order description</label>
                <textarea
                  name="description"
                  placeholder="Enter message"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="mt-4 w-full bg-blue-700 text-white rounded-lg py-2 font-medium hover:bg-blue-800 transition"
              >
                Next
              </button>
            </form>
          )}
          {/* Future steps go here */}
        </div>
      </div>
    </div>
  );
};

export default CreateOrderWizard; 