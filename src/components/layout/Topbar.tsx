import React, { useState, useRef, useEffect } from 'react';
import logo from '../../logo.svg';
import { IconBell } from '@tabler/icons-react';
import { NotificationSidebar } from '../ui';
import { useAuth } from 'contexts/AuthContext';
import { mockNotifications } from 'data';


const Topbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const bellRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const unreadCount = mockNotifications.filter(n => !n.read).length;
    const { isAuthenticated } = useAuth();

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

            {isAuthenticated &&
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
            }
        </header>
    );
};

export default Topbar; 