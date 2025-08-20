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
    wallet_balance: string;
    escrow_balance: string;
    pending_transactions: number;
}

// Order types
export interface OrderUser {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
}

export type OrderStatus = 'pending' | 'active' | 'cancelled' | 'completed' | 'disputed';
export interface Order {
    public_id: string;
    item_name: string;
    item_price: number;
    fee_amount: number;
    status: OrderStatus;

    initiator_role: "buyer" | "seller";
    receiver?: OrderUser;
    initiator?: OrderUser;
    receiver_email?: string;
    receiver_phone?: string;
    images?: string[];

    description: string;
    expected_delivery_date: string;
    created_at: string;
    updated_at: string;
}


// Transaction types
export type TransactionType = 'escrow payment' | 'escrow fee' | 'escrow release' | 'dispute fee' | 'refund' | 'payout' | 'withdrawal' | 'deposit';

export type TransactionDirection = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled' | 'processing';

export interface Transaction {
    id: string;
    amount: string;
    created_at: string;
    updated_at: string;
    description: string;
    user_id: string | null;
    escrow_id: string | null;
    status: TransactionStatus;
    processed_at?: string | null;
    direction: TransactionDirection;
    transaction_type: TransactionType;
    payment_metadata?: Record<string, any> | null;
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
    name: string;
    receiver_email: string;
    receiver_phone: string;
    description: string;
    price: string;
    role: any;
    images: File[];
    logistic_service?: string;
    delivery_date: string;
}

export interface CreateDisputeForm {
    reason: string;
    images: File[];
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface ProtectedRouteProps {
    children: React.ReactNode;
}

export interface LayoutProps {
    children?: React.ReactNode;
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
    itemName: string;
    initiatorName: string;
    description: string;
    price: number;
    onStatusChange?: (orderId: string, status: "active" | "cancelled") => void;
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
