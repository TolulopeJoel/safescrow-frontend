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
    name: 'Aubrey',
    email: 'aubrey@email.com',
    phone: '+2348012345678',
  },
  {
    id: '2',
    name: 'Debra',
    email: 'debra@email.com',
    phone: '+2348023456789',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@email.com',
    phone: '+2348034567890',
  },
  {
    id: '4',
    name: 'Jane Doe',
    email: 'jane@email.com',
    phone: '+2348045678901',
  },
  {
    id: '5',
    name: 'Ronald',
    email: 'ronald@email.com',
    phone: '+2348056789012',
  },
  {
    id: '6',
    name: 'Jane',
    email: 'jane@email.com',
    phone: '+2348067890123',
  },
];

// ============================================================================
// ORDERS
// ============================================================================

export const mockOrders: Order[] = [
  {
    id: '1',
    orderId: '9060EBE1',
    status: 'pending',
    total: 50000,
    buyer: mockUsers[0], // Aubrey
    seller: mockUsers[1], // Debra
    item: 'iPhone 16',
    description: 'Brand new iPhone 16, 256GB, Space Black',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    deliveryDate: '2025-08-10',
    note: '2 years manufacturer warranty',
    images: ['iphone16-1.jpg', 'iphone16-2.jpg'],
  },
  {
    id: '2',
    orderId: 'ORD002',
    status: 'pending',
    total: 25000,
    buyer: mockUsers[2], // John Doe
    seller: mockUsers[1], // Debra
    item: 'MacBook Pro',
    description: 'MacBook Pro 14-inch, M2 Pro, 16GB RAM',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    deliveryDate: '2025-08-15',
    note: 'Includes original box and accessories',
    images: ['macbook-1.jpg'],
  },
  {
    id: '3',
    orderId: 'ORD003',
    status: 'accepted',
    total: 15000,
    buyer: mockUsers[0], // Aubrey
    seller: mockUsers[1], // Debra
    item: 'AirPods Pro',
    description: 'AirPods Pro 2nd generation',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    deliveryDate: '2025-08-20',
    note: 'Brand new sealed',
    images: ['airpods-1.jpg'],
  },
  {
    id: '4',
    orderId: '453796',
    status: 'pending',
    total: 40300,
    buyer: mockUsers[0], // Aubrey
    seller: mockUsers[1], // Debra
    item: 'iPhone 16',
    description: 'Brand new iPhone 16',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    deliveryDate: '2025-08-10',
  },
  {
    id: '5',
    orderId: '453797',
    status: 'in progress',
    total: 40000,
    buyer: mockUsers[1], // Debra
    seller: mockUsers[2], // John
    item: 'MacBook Pro',
    description: 'MacBook Pro 14-inch',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    deliveryDate: '2025-08-15',
  },
  {
    id: '6',
    orderId: '453798',
    status: 'pending',
    total: 40000,
    buyer: mockUsers[4], // Ronald
    seller: mockUsers[5], // Jane
    item: 'AirPods Pro',
    description: 'AirPods Pro 2nd generation',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-02',
    deliveryDate: '2025-08-20',
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

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find(order => order.orderId === orderId || order.id === orderId);
};

export const getOrdersByStatus = (status: string): Order[] => {
  return mockOrders.filter(order => order.status === status);
};

export const getTransactionsByType = (type: string): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.type === type);
};

export const getDisputesByStatus = (status: string): Dispute[] => {
  return mockDisputes.filter(dispute => dispute.status === status);
}; 