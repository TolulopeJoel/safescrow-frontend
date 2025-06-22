// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Escrow types
export interface Escrow {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'disputed';
  senderId: string;
  recipientId: string;
  sender: User;
  recipient: User;
  description: string;
  conditions: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API Response types
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

// Form types
export interface CreateEscrowForm {
  amount: number;
  recipientEmail: string;
  description: string;
  conditions: string;
  currency?: string;
}

// Component props types
export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
} 