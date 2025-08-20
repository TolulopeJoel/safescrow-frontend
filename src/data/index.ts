// ============================================================================
// MOCK DATA - Centralized data source for the entire application
// ============================================================================

import {  Dispute, Notification, TimelineEvent } from '../types';

// ============================================================================
// DISPUTES
// ============================================================================

export const mockDisputes: Dispute[] = [
  {
    id: 'D001',
    orderId: 'O123',
    reason: 'Item not as described',
    status: 'open',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    images: [],
  },
  {
    id: 'D002',
    orderId: 'O124',
    reason: 'Payment not received',
    status: 'resolved',
    createdAt: '2024-05-20',
    updatedAt: '2024-05-22',
    images: [],
  },
];

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'New Order Received',
    desc: 'You have received a new order from John Doe',
    read: false,
    time: '2 minutes ago',
  },
  {
    id: 2,
    title: 'Payment Confirmed',
    desc: 'Payment for Order #ORD001 has been confirmed',
    read: false,
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'Dispute Opened',
    desc: 'A dispute has been opened for Order #ORD002',
    read: true,
    time: '3 hours ago',
  },
  {
    id: 4,
    title: 'Escrow Released',
    desc: 'Escrow funds have been released for Order #ORD003',
    read: true,
    time: '1 day ago',
  },
];

// ============================================================================
// TIMELINE EVENTS
// ============================================================================

export const mockTimelineEvents: TimelineEvent[] = [
  { date: '2024-06-01', label: 'Order pending', desc: 'Order is waiting to be accepted by the buyer' },
  { date: '2024-06-01', label: 'Order accepted', desc: 'Order has been accepted by the buyer' },
  { date: '2024-06-01', label: 'Payment in escrow', desc: 'Buyer has transferred amount to escrow and is awaiting delivery' },
  { date: '', label: 'Delivery confirmed', desc: 'Delivery has been confirmed by the buyer', current: true },
  { date: '', label: 'Product accepted', desc: 'Delivery has been accepted by the buyer' },
  { date: '', label: 'Release of funds', desc: 'Funds has been successfully transferred to your escrow wallet' }
];
