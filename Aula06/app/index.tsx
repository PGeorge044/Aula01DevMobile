import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Product } from '@/types';
import { useProducts, useCategories, useFavorites, useSearch } from '@/hooks/useApi';
import { SearchHeader } from '@/components/SearchHeader';
import { ProductCard } from '@/components/ProductCard';
import { LoadingSpinner, ErrorMessage } from '@/components/ui/Button';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    filterByCategory,
    selectedCategory,
  } = useProducts();

  const { categories } = useCategories();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { query, setQuery, results, loading: searchLoading } = useSearch();

  const displayProducts = query ? results : products;
  const isLoading = query ? searchLoading : loading === 'loading';

  const handleProductPress = useCallback((product: Product) => {
    router.push(`/product/${product.id}`);
  }, [router]);

  const handleFavoritePress = useCallback((product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  const handleLoadMore = useCallback(() => {
    if (!query && hasMore && !isLoading) {
      loadMore();
    }
  }, [query, hasMore, isLoading, loadMore]);

  const handleCategorySelect = useCallback((categoryId?: string) => {
    setQuery(''); // Clear search when filtering by category
    filterByCategory(categoryId);
  }, [setQuery, filterByCategory]);

  const renderHeader = () => (
    <SearchHeader
      searchQuery={query}
      onSearchChange={setQuery}
      categories={categories}
      selectedCategory={selectedCategory}
      onCategorySelect={handleCategorySelect}
      loading={isLoading}
    />
  );

  const renderEmpty = () => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          {query ? 'Nenhum produto encontrado' : 'Nenhum produto disponível'}
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!hasMore || query || isLoading) return null;

    return (
      <View style={styles.footerContainer}>
        <Text style={[styles.footerText, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          Carregando mais produtos...
        </Text>
      </View>
    );
  };

  if (loading === 'loading' && products.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (error && products.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <ErrorMessage message={error} onRetry={refresh} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <FlatList
        data={displayProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard
              product={item}
              onPress={() => handleProductPress(item)}
              onFavoritePress={() => handleFavoritePress(item)}
              isFavorite={isFavorite(item.id)}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors[colorScheme ?? 'light'].tint}
            colors={[Colors[colorScheme ?? 'light'].tint]}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  productWrapper: {
    flex: 1,
    maxWidth: '50%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
});