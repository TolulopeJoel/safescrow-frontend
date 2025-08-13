// ============================================================================
// MOCK DATA - Centralized data source for the entire application
// ============================================================================

import { Order, Transaction, Dispute, Notification, TimelineEvent, OrderUser } from '../types';

// ============================================================================
// USERS
// ============================================================================

export const mockUsers: OrderUser[] = [
  {
    id: '1',
    full_name: 'Aubrey',
    email: 'aubrey@email.com',
    phone: '+2348012345678',
  }
];

// ============================================================================
// ORDERS
// ============================================================================

export const mockOrders: Order[] = [
  {
    public_id: '9060EBE1',
    item_name: 'iPhone 16',
    item_price: 50000,
    fee_amount: 1000,
    status: 'pending',
    initiator_role: 'buyer',
    receiver: mockUsers[0], // Debra
    receiver_email: 'debra@example.com',
    receiver_phone: '123-456-7890',
    images: ['iphone16-1.jpg', 'iphone16-2.jpg'],
    description: 'Brand new iPhone 16, 256GB, Space Black',
    expected_delivery_date: '2025-08-10',
    created_at: '2024-06-01',
    updated_at: '2024-06-02',
  },
  {
    public_id: 'ORD002',
    item_name: 'MacBook Pro',
    item_price: 25000,
    fee_amount: 800,
    status: 'pending',
    initiator_role: 'buyer',
    receiver: mockUsers[0], // Debra
    receiver_email: 'debra@example.com',
    receiver_phone: '123-456-7890',
    images: ['macbook-1.jpg'],
    description: 'MacBook Pro 14-inch, M2 Pro, 16GB RAM',
    expected_delivery_date: '2025-08-15',
    created_at: '2024-06-01',
    updated_at: '2024-06-02',
  },
];

// ============================================================================
// TRANSACTIONS
// ============================================================================

export const mockTransactions: Transaction[] = [
  {
    id: 'WALLET001',
    type: 'funding',
    amount: 50000,
    direction: 'credit',
    description: 'Funded wallet via Paystack',
    date: '2025-07-01 03:17',
    status: 'completed',
  },
  {
    id: 'WALLET002',
    type: 'withdrawal',
    amount: 20000,
    direction: 'debit',
    description: 'Withdrawal to GTBank (****1234)',
    date: '2025-07-02 22:41',
    status: 'pending',
  },
  {
    id: 'WALLET003',
    type: 'escrow release',
    amount: 15000,
    direction: 'credit',
    description: 'Escrow released from Order #123',
    date: '2025-07-03 05:09',
    status: 'completed',
    orderId: 'ORD003',
  },
  {
    id: 'WALLET004',
    type: 'fee',
    amount: 500,
    direction: 'debit',
    description: 'Transaction fee for Order #123',
    date: '2025-07-03 13:56',
    status: 'completed',
    orderId: 'ORD003',
  },
  {
    id: 'WALLET005',
    type: 'bonus',
    amount: 1000,
    direction: 'credit',
    description: 'Referral bonus',
    date: '2025-07-04 00:48',
    status: 'completed',
  },
  {
    id: 'WALLET006',
    type: 'refund',
    amount: 3000,
    direction: 'credit',
    description: 'Refund for cancelled order',
    date: '2025-07-05 19:22',
    status: 'completed',
  },
  {
    id: 'WALLET007',
    type: 'refund',
    amount: 3000,
    direction: 'credit',
    description: 'Refund for cancelled order',
    date: '2025-07-05 07:33',
    status: 'completed',
  },
];

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

// ============================================================================
// PENDING ORDER CARDS DATA
// ============================================================================

export const pendingOrders = [
  {
    orderId: 'ORD001',
    initiatorName: 'John Doe',
    description: 'This is a description',
    price: 100,
  },
  {
    orderId: 'ORD002',
    initiatorName: 'Jane Doe',
    description: 'This is a description',
    price: 200,
  },
  {
    orderId: 'ORD003',
    initiatorName: 'John Doe',
    description: 'This is a description',
    price: 300,
  },
];
