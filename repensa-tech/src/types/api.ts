export type UserRole = 'student' | 'admin'

export type ProductCondition = 'new' | 'good' | 'regular'
export type ProductStatus = 'available' | 'reserved' | 'sold'
export type ProductCategory =
  | 'microcontrollers'
  | 'sensors'
  | 'memory'
  | 'displays'
  | 'cables'
  | 'power'
  | 'other'

export type SubscriptionStatus = 'active' | 'inactive' | 'expired'

export interface User {
  id: string
  university_id: string
  full_name: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface University {
  id: string
  name: string
  email_domain: string
  subscription_status: SubscriptionStatus
  subscription_start: string
  subscription_end: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  seller_id: string
  university_id: string
  name: string
  description: string | null
  price: number
  is_donation: boolean
  category: ProductCategory
  condition: ProductCondition
  status: ProductStatus
  image_url: string
  image_public_id: string | null
  created_at: string
  updated_at: string
  seller_name?: string
  seller_email?: string
}

export interface UploadProductImageResponse {
  image_url: string
  image_public_id: string
  width: number
  height: number
}

export interface CreateProductRequest {
  name: string
  description?: string
  price: number
  is_donation: boolean
  category: ProductCategory
  condition: ProductCondition
  image_url: string
  image_public_id?: string
}

export interface RegisterRequest {
  university_id: string
  full_name: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  user: User
}

export interface LoginResponse {
  token: string
  user: User
}

export interface ProductFilters {
  category?: ProductCategory
  condition?: ProductCondition
  is_donation?: boolean
  search?: string
}

export type TransactionType = 'purchase' | 'sale' | 'donation'
export type TransactionStatus = 'reserved' | 'completed' | 'donated'
export type TransactionFilter = 'all' | TransactionType

export interface Transaction {
  id: string
  product_name: string
  image_url?: string | null
  type: TransactionType
  date: string
  counterparty_name: string
  amount: number
  status: TransactionStatus
}

export interface HistorySummary {
  purchases_count: number
  sales_count: number
  savings_total: number
}
