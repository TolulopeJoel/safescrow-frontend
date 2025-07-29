// ============================================================================
// CORE ENTITY TYPES
// ============================================================================

// User types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

// Order types
export interface OrderUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export type OrderStatus = 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled' | 'in progress';
export interface Order {
  id: string;
  orderId: string;
  status: OrderStatus;
  total: number;
  buyer: OrderUser;
  seller: OrderUser;
  item: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deliveryDate: string;
  note?: string;
  images?: string[];
}

// Transaction types
export type TransactionType = 'funding' | 'withdrawal' | 'escrow release' | 'fee' | 'bonus' | 'refund' | 'transfer';
export type TransactionDirection = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  direction: TransactionDirection;
  description: string;
  date: string;
  status: TransactionStatus;
  counterpart?: string;
  orderId?: string;
}

// Dispute types
export type DisputeStatus = 'open' | 'resolved' | 'closed' | 'under review';
export interface Dispute {
  id: string;
  orderId: string;
  reason: string;
  status: DisputeStatus;
  createdAt: string;
  updatedAt: string;
  images?: string[];
  description?: string;
}

// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  nin: string;
  password: string;
  password2: string;
  full_name: string;
  phone_number: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface CreateOrderForm {
  title: string;
  email: string;
  phone: string;
  description: string;
  amount: string;
  feePayer: string;
  images: File[];
  logisticsService: string;
  deliveryDate: string;
}

export interface CreateDisputeForm {
  orderId: string;
  reason: string;
  description?: string;
  images: File[];
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
}

// UI Component Props
export interface Notification {
  id: number;
  title: string;
  desc: string;
  read: boolean;
  time: string;
}

export interface TimelineEvent {
  date?: string;
  label: string;
  desc: string;
  current?: boolean;
}

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface DashboardCard {
  title: string;
  value: string | number;
  active?: boolean;
  showToggle?: boolean;
}

export interface PendingOrderCardProps {
  orderId: string;
  initiatorName: string;
  description: string;
  price: number;
}

// ============================================================================
// SERVICE INTERFACES
// ============================================================================

export interface OrderService {
  fetchOrder(orderId: string): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<{ success: boolean; status: string }>;
  createOrder(form: CreateOrderForm): Promise<Order>;
  getOrders(): Promise<Order[]>;
}

export interface TransactionService {
  getTransactions(): Promise<Transaction[]>;
  getWalletTransactions(): Promise<Transaction[]>;
}

export interface DisputeService {
  getDisputes(): Promise<Dispute[]>;
  createDispute(form: CreateDisputeForm): Promise<Dispute>;
  updateDisputeStatus(disputeId: string, status: DisputeStatus): Promise<Dispute>;
}
