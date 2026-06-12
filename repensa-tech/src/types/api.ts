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
  image_url: string | null
  created_at: string
  updated_at: string
  seller_name?: string
  seller_email?: string
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
