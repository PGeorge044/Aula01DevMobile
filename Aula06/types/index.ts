export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FavoriteItem {
  productId: string;
  addedAt: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}