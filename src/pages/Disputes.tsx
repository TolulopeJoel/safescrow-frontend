import React, { useState } from 'react';
import { Topbar, SidebarNav } from 'components/layout';
import { IconGavel } from '@tabler/icons-react';
import { ImageDropzone } from 'components/ui';

// Dummy initial disputes data
const initialDisputes: Array<{
  id: string;
  orderId: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  images?: string[];
}> = [
  {
    id: 'D001',
    orderId: 'O123',
    reason: 'Item not as described',
    status: 'Open',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    images: [],
  },
  {
    id: 'D002',
    orderId: 'O124',
    reason: 'Payment not received',
    status: 'Resolved',
    createdAt: '2024-05-20',
    updatedAt: '2024-05-22',
    images: [],
  },
];

// Dummy orders for selection (should match Orders page for now)
const dummyOrders = [
  { id: '1', user: 'Aubrey', orderId: '453796', refCode: '453796', total: 40300, status: 'Pending' },
  { id: '2', user: 'Debra', orderId: '453796', refCode: '453796', total: 40000, status: 'In progress' },
  { id: '3', user: 'Ronald', orderId: '453796', refCode: '453796', total: 40000, status: 'Pending' },
];

const Disputes: React.FC = () => {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ orderId: '', reason: '' });
  const [errors, setErrors] = useState<{ orderId?: string; reason?: string; images?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const openModal = () => {
    setForm({ orderId: '', reason: '' });
    setErrors({});
    setImages([]);
    setImagePreviews([]);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: { orderId?: string; reason?: string; images?: string } = {};
    if (!form.orderId) {
      newErrors.orderId = 'Order is required';
      valid = false;
    }
    if (!form.reason) {
      newErrors.reason = 'Reason is required';
      valid = false;
    }
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return;
    setSubmitting(true);
    setTimeout(() => {
      setDisputes([
        {
          id: `D${Math.floor(Math.random() * 10000)}`,
          orderId: form.orderId,
          reason: form.reason,
          status: 'Open',
          createdAt: new Date().toISOString().slice(0, 10),
          updatedAt: new Date().toISOString().slice(0, 10),
          images: imagePreviews, // store previews for now
        },
        ...disputes,
      ]);
      setSubmitting(false);
      setShowModal(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <div className="flex">
        <SidebarNav />
        <main className="flex-1 p-4 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <IconGavel className="w-7 h-7 text-primary-600" />
              <h1 className="text-2xl font-semibold">Dispute Resolution</h1>
            </div>
            <button
              className="bg-primary-700 text-white rounded-lg px-6 py-2 font-medium hover:bg-primary-800 transition"
              onClick={openModal}
            >
              Raise Dispute
            </button>
          </div>
          {/* Modern card-based dispute list */}
          <div className="grid gap-4 sm:gap-6">
            {disputes.length === 0 ? (
              <div className="text-center text-gray-400 py-12">No disputes found.</div>
            ) : (
              disputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${dispute.status === 'Open' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                      <IconGavel className={`w-7 h-7 ${dispute.status === 'Open' ? 'text-yellow-600' : 'text-green-600'}`} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-base text-gray-900">Order #{dispute.orderId}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${dispute.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{dispute.status}</span>
                      </div>
                      <div className="text-gray-700 text-sm mb-1 truncate max-w-xs">{dispute.reason}</div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                        <span>Dispute ID: <span className="font-mono">{dispute.id}</span></span>
                        <span>Created: {dispute.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal for raising dispute */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                <button
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-2xl"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <IconGavel className="w-6 h-6 text-primary-600" />
                  <span>Raise a Dispute</span>
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Order</label>
                    <select
                      name="orderId"
                      value={form.orderId}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 ${errors.orderId ? 'border-red-400' : 'border-gray-300'}`}
                    >
                      <option value="">Select an order</option>
                      {dummyOrders.map((order) => (
                        <option key={order.id} value={order.orderId}>
                          {order.orderId} - {order.user}
                        </option>
                      ))}
                    </select>
                    {errors.orderId && <span className="text-xs text-red-500">{errors.orderId}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Reason</label>
                    <textarea
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-3 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary-200 ${errors.reason ? 'border-red-400' : 'border-gray-300'}`}
                      placeholder="Describe the issue"
                    />
                    {errors.reason && <span className="text-xs text-red-500">{errors.reason}</span>}
                  </div>
                  <div>
                    <ImageDropzone
                      label="Upload images to support your claim"
                      images={images}
                      imagePreviews={imagePreviews}
                      onChange={(files, previews) => {
                        setImages(files);
                        setImagePreviews(previews);
                        setErrors((prev) => ({ ...prev, images: '' }));
                      }}
                      error={errors.images}
                      maxImages={5}
                      isRequired
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100"
                      onClick={closeModal}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-primary-700 text-white font-medium hover:bg-primary-800 transition"
                      disabled={submitting}
                    >
                      {submitting ? 'Creating...' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Disputes; 