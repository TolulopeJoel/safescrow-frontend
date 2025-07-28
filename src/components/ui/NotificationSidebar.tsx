import React from 'react';
import { Notification } from 'types';

interface NotificationSidebarProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ open, onClose, notifications }) => {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${open ? 'opacity-30' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sidebar */}
      <aside
        className={`absolute right-0 top-0 h-full w-96 max-w-full bg-white shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">All Notifications</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded" aria-label="Close sidebar">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <ul className="divide-y divide-gray-100 max-h-[calc(100vh-64px)] overflow-y-auto">
          {notifications.length === 0 ? (
            <li className="p-4 text-gray-500 text-sm">No notifications</li>
          ) : (
            notifications.map((notif) => (
              <li
                key={notif.id}
                className={`px-4 py-5 hover:bg-gray-50 cursor-pointer ${!notif.read && 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${!notif.read ? 'text-primary-700' : 'text-gray-800'}`}>{notif.title}</span>
                  <span className="text-xs text-gray-400 ml-2">{notif.time}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{notif.desc}</div>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  );
};

export default NotificationSidebar; 