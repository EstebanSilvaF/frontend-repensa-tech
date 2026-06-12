import type { Product, ProductFilters } from '../types/api'
import { apiClient } from './client'

export const productService = {
  getProducts: (filters?: ProductFilters) =>
    apiClient.get<Product[]>('/products', {
      params: {
        category: filters?.category,
        condition: filters?.condition,
        is_donation: filters?.is_donation,
        search: filters?.search,
      },
    }),
}
