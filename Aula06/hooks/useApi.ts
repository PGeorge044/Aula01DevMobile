import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, ApiResponse, Category, FavoriteItem, LoadingState, ApiError } from '@/types';
import { apiService } from '@/services/api';

const FAVORITES_KEY = '@favorites';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const fetchProducts = useCallback(async (
    pageNum: number = 1,
    category?: string,
    search?: string,
    append: boolean = false
  ) => {
    try {
      setLoading(pageNum === 1 ? 'loading' : 'idle');
      setError(null);

      const response: ApiResponse<Product> = await apiService.getProducts(
        pageNum,
        10,
        category,
        search
      );

      setProducts(prev =>
        append ? [...prev, ...response.data] : response.data
      );
      setHasMore(response.hasMore);
      setPage(pageNum);
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      setLoading('error');
    }
  }, []);

  const loadMore = useCallback(() => {
    if (hasMore && loading !== 'loading') {
      fetchProducts(page + 1, selectedCategory, undefined, true);
    }
  }, [hasMore, loading, page, selectedCategory, fetchProducts]);

  const refresh = useCallback(() => {
    setPage(1);
    fetchProducts(1, selectedCategory);
  }, [selectedCategory, fetchProducts]);

  const filterByCategory = useCallback((category?: string) => {
    setSelectedCategory(category);
    setPage(1);
    fetchProducts(1, category);
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    filterByCategory,
    selectedCategory,
  };
}

export function useProductDetails(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<LoadingState>('loading');
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading('loading');
      setError(null);

      const data = await apiService.getProductById(id);
      setProduct(data);
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Erro ao carregar produto';
      setError(errorMessage);
      setLoading('error');
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading('loading');
      setError(null);

      const data = await apiService.getCategories();
      setCategories(data);
      setLoading('success');
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Erro ao carregar categorias';
      setError(errorMessage);
      setLoading('error');
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveFavorites = useCallback(async (newFavorites: FavoriteItem[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }, []);

  const addToFavorites = useCallback((productId: string) => {
    const newFavorite: FavoriteItem = {
      productId,
      addedAt: new Date().toISOString(),
    };
    const updated = [...favorites, newFavorite];
    saveFavorites(updated);
  }, [favorites, saveFavorites]);

  const removeFromFavorites = useCallback((productId: string) => {
    const updated = favorites.filter(fav => fav.productId !== productId);
    saveFavorites(updated);
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((productId: string) => {
    return favorites.some(fav => fav.productId === productId);
  }, [favorites]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await apiService.searchProducts(searchQuery);
      setResults(data);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Erro na busca';
      setError(errorMessage);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) {
        search(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, search]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
  };
}