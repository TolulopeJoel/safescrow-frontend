import React, { useState, useRef, useEffect } from 'react';
import logo from '../../logo.svg';
import { IconBell } from '@tabler/icons-react';
import { NotificationSidebar } from '../ui';

const mockNotifications = [
  { id: 1, title: 'Order #1234 confirmed', desc: 'Your order has been confirmed by the seller.', read: false, time: '2m ago' },
  { id: 2, title: 'Payment received', desc: 'Escrow has received your payment.', read: false, time: '10m ago' },
  { id: 3, title: 'Order shipped', desc: 'Seller has shipped your order.', read: true, time: '1h ago' },
  { id: 4, title: 'Order delivered', desc: 'Your package has been delivered.', read: true, time: '2h ago' },
  { id: 5, title: 'Dispute opened', desc: 'A dispute has been opened for Order #1234.', read: true, time: '3h ago' },
  { id: 6, title: 'Refund initiated', desc: 'A refund has been initiated for Order #1229.', read: true, time: '4h ago' },
  { id: 7, title: 'New message', desc: 'You have a new message from the seller.', read: true, time: '5h ago' },
  { id: 8, title: 'Order #1240 confirmed', desc: 'Seller confirmed your order.', read: true, time: '6h ago' },
  { id: 9, title: 'Reminder: Review seller', desc: 'Don’t forget to review your last seller.', read: true, time: '7h ago' },
  { id: 10, title: 'Offer received', desc: 'A buyer has made an offer for your item.', read: true, time: '8h ago' },
  { id: 11, title: 'Payment released', desc: 'Payment has been released to the seller.', read: true, time: '9h ago' },
  { id: 12, title: 'Account verification needed', desc: 'Please verify your identity to continue.', read: true, time: '10h ago' },
  { id: 13, title: 'Seller rating updated', desc: 'Your rating has been updated.', read: true, time: '12h ago' },
  { id: 14, title: 'New order received', desc: 'You have received a new order.', read: true, time: '13h ago' },
  { id: 15, title: 'Shipping address updated', desc: 'Your shipping address was changed.', read: true, time: '14h ago' },
  { id: 16, title: 'Password changed', desc: 'Your password has been successfully changed.', read: true, time: '15h ago' },
  { id: 17, title: 'Order #1250 cancelled', desc: 'Buyer cancelled the order.', read: true, time: '16h ago' },
  { id: 18, title: 'New feature available', desc: 'Try out the new escrow tracking system.', read: true, time: '17h ago' },
  { id: 19, title: 'Weekly summary', desc: 'Your weekly activity summary is ready.', read: true, time: '18h ago' },
  { id: 20, title: 'Support ticket replied', desc: 'Our team has replied to your support ticket.', read: true, time: '19h ago' },
  { id: 21, title: 'Promo alert', desc: 'Get 10% off your next transaction.', read: true, time: '1d ago' },
  { id: 22, title: 'Document uploaded', desc: 'Your verification document has been uploaded.', read: true, time: '1d ago' },
  { id: 23, title: 'Item favorited', desc: 'A user has favorited your item.', read: true, time: '1d ago' },
  { id: 24, title: 'Withdrawal processed', desc: 'Your wallet withdrawal is being processed.', read: true, time: '1d ago' },
  { id: 25, title: 'Order #1260 pending', desc: 'You have a pending order.', read: true, time: '1d ago' },
  { id: 26, title: 'Two-factor enabled', desc: '2FA has been enabled on your account.', read: true, time: '2d ago' },
  { id: 27, title: 'Buyer completed order', desc: 'Buyer has marked the order as completed.', read: true, time: '2d ago' },
  { id: 28, title: 'Payment failed', desc: 'Your recent payment did not go through.', read: true, time: '2d ago' },
  { id: 29, title: 'Seller updated shipping', desc: 'Seller changed the shipping info.', read: true, time: '2d ago' },
  { id: 30, title: 'Escrow release scheduled', desc: 'Funds will be released to seller soon.', read: true, time: '2d ago' },
];

const Topbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const [dropdownFocusIndex, setDropdownFocusIndex] = useState(-1);

  // Keyboard accessibility for bell and dropdown
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') {
        setOpen(false);
        bellRef.current?.focus();
      }
      // Trap focus in dropdown
      if (e.key === 'Tab') {
        const focusable = dropdownRef.current?.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
        if (focusable && focusable.length > 0) {
          const first = focusable[0] as HTMLElement;
          const last = focusable[focusable.length - 1] as HTMLElement;
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      }
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <header className="flex items-center justify-between bg-white px-8 py-4 border-b">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Safescrow Logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-gray-800">Safescrow</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            ref={bellRef}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative focus:outline-primary-200"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="notif-dropdown"
            tabIndex={0}
            onClick={() => setOpen((v) => !v)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen((v) => !v);
              }
            }}
          >
            <span className="sr-only">Notifications</span>
            <IconBell className="w-6 h-6 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          {open && (
            <div
              ref={dropdownRef}
              id="notif-dropdown"
              className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              role="menu"
              aria-label="Notifications"
            >
              <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                {mockNotifications.length === 0 ? (
                  <li className="p-4 text-gray-500 text-sm">No notifications</li>
                ) : (
                  mockNotifications.slice(0, 3).map((notif) => (
                    <li
                      key={notif.id}
                      className={`px-4 py-5 hover:bg-gray-50 cursor-pointer ${!notif.read && 'bg-gray-50'} focus:outline-primary-200`}
                      tabIndex={-1}
                      role="menuitem"
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
              <div className="p-2 text-center border-t">
                <button
                  className="w-full text-primary-700 text-sm font-medium py-2 rounded hover:bg-gray-100 active:scale-95 transition focus:outline-primary-200 focus:ring-2 focus:ring-primary-400 focus:bg-primary-50 cursor-pointer select-none"
                  tabIndex={0}
                  onClick={() => {
                    setSidebarOpen(true);
                    setOpen(false);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSidebarOpen(true);
                      setOpen(false);
                    }
                  }}
                >
                  View all
                </button>
              </div>
            </div>
          )}
        </div>
        <NotificationSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          notifications={mockNotifications}
        />
      </div>
    </header>
  );
};

export default Topbar; 