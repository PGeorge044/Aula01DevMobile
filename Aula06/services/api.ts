import { Product, ApiResponse, Category, ApiError } from '@/types';

// Mock API data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'O smartphone mais avançado da Apple com câmera profissional e chip A17 Pro.',
    price: 8999.99,
    originalPrice: 9999.99,
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    tags: ['apple', 'premium', 'camera', '5g'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    description: 'Ultrafino e poderoso com chip M3, bateria de até 18 horas.',
    price: 12999.99,
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    rating: 4.9,
    reviews: 892,
    inStock: true,
    tags: ['apple', 'ultrabook', 'm3', 'portable'],
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-01-10T08:30:00Z',
  },
  {
    id: '3',
    name: 'AirPods Pro (2ª geração)',
    description: 'Fones sem fio com cancelamento ativo de ruído e modo de transparência.',
    price: 1999.99,
    originalPrice: 2299.99,
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c4b5b5?w=400',
    rating: 4.7,
    reviews: 2156,
    inStock: false,
    tags: ['apple', 'wireless', 'noise-cancelling', 'compact'],
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-08T14:20:00Z',
  },
  {
    id: '4',
    name: 'iPad Air',
    description: 'Tablet versátil com display Liquid Retina e chip M2.',
    price: 5999.99,
    category: 'tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    rating: 4.6,
    reviews: 743,
    inStock: true,
    tags: ['apple', 'tablet', 'm2', 'versatile'],
    createdAt: '2024-01-05T11:45:00Z',
    updatedAt: '2024-01-05T11:45:00Z',
  },
  {
    id: '5',
    name: 'Apple Watch Series 9',
    description: 'Smartwatch com detecção de acidentes e monitoramento avançado de saúde.',
    price: 3999.99,
    category: 'wearables',
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400',
    rating: 4.5,
    reviews: 1234,
    inStock: true,
    tags: ['apple', 'health', 'fitness', 'smartwatch'],
    createdAt: '2024-01-03T09:15:00Z',
    updatedAt: '2024-01-03T09:15:00Z',
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5',
    description: 'Fones over-ear com cancelamento de ruído líder de mercado.',
    price: 2999.99,
    originalPrice: 3499.99,
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
    rating: 4.8,
    reviews: 1876,
    inStock: true,
    tags: ['sony', 'noise-cancelling', 'wireless', 'premium'],
    createdAt: '2024-01-01T16:30:00Z',
    updatedAt: '2024-01-01T16:30:00Z',
  },
  {
    id: '7',
    name: 'Dell XPS 13',
    description: 'Ultrabook premium com processador Intel Core i7 e tela InfinityEdge.',
    price: 8999.99,
    category: 'laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    rating: 4.4,
    reviews: 567,
    inStock: true,
    tags: ['dell', 'ultrabook', 'intel', 'premium'],
    createdAt: '2023-12-28T13:20:00Z',
    updatedAt: '2023-12-28T13:20:00Z',
  },
  {
    id: '8',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Flagship Android com S Pen integrado e câmera de 200MP.',
    price: 7999.99,
    category: 'smartphones',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    rating: 4.7,
    reviews: 2156,
    inStock: true,
    tags: ['samsung', 'android', 's-pen', 'camera'],
    createdAt: '2023-12-25T10:00:00Z',
    updatedAt: '2023-12-25T10:00:00Z',
  },
];

const mockCategories: Category[] = [
  { id: 'smartphones', name: 'Smartphones', icon: '📱', color: '#FF6B6B' },
  { id: 'laptops', name: 'Laptops', icon: '💻', color: '#4ECDC4' },
  { id: 'tablets', name: 'Tablets', icon: '📱', color: '#45B7D1' },
  { id: 'audio', name: 'Áudio', icon: '🎧', color: '#96CEB4' },
  { id: 'wearables', name: 'Wearables', icon: '⌚', color: '#FFEAA7' },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random failures (5% chance)
const shouldFail = () => Math.random() < 0.05;

class ApiService {
  private baseUrl = 'https://api.mockstore.com';

  async getProducts(
    page: number = 1,
    limit: number = 10,
    category?: string,
    search?: string
  ): Promise<ApiResponse<Product>> {
    await delay(Math.random() * 1500 + 500); // 500-2000ms delay

    if (shouldFail()) {
      throw new ApiError('Falha na conexão com o servidor', 'NETWORK_ERROR', 500);
    }

    let filteredProducts = [...mockProducts];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      total: filteredProducts.length,
      page,
      limit,
      hasMore: endIndex < filteredProducts.length,
    };
  }

  async getProductById(id: string): Promise<Product> {
    await delay(Math.random() * 800 + 200); // 200-1000ms delay

    if (shouldFail()) {
      throw new ApiError('Produto não encontrado', 'NOT_FOUND', 404);
    }

    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new ApiError('Produto não encontrado', 'NOT_FOUND', 404);
    }

    return product;
  }

  async getCategories(): Promise<Category[]> {
    await delay(Math.random() * 300 + 100); // 100-400ms delay

    if (shouldFail()) {
      throw new ApiError('Erro ao carregar categorias', 'CATEGORY_ERROR', 500);
    }

    return mockCategories;
  }

  async searchProducts(query: string): Promise<Product[]> {
    await delay(Math.random() * 600 + 200); // 200-800ms delay

    if (shouldFail()) {
      throw new ApiError('Erro na busca', 'SEARCH_ERROR', 500);
    }

    const searchLower = query.toLowerCase();
    return mockProducts.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
}

export const apiService = new ApiService();
export { ApiError };