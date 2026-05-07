import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useProducts, useCategories } from '@/hooks/useApi';
import { ProductCard } from '@/components/ProductCard';
import { SearchHeader } from '@/components/SearchHeader';
import { LoadingSpinner, ErrorMessage } from '@/components/ui/Button';

type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showSortOptions, setShowSortOptions] = useState(false);

  const {
    products,
    loading,
    error,
    filterByCategory,
    selectedCategory,
  } = useProducts();

  const { categories } = useCategories();

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const sortOptions = [
    { key: 'name', label: 'Nome (A-Z)', icon: '📝' },
    { key: 'price-low', label: 'Preço: Menor', icon: '💰' },
    { key: 'price-high', label: 'Preço: Maior', icon: '💎' },
    { key: 'rating', label: 'Avaliação', icon: '⭐' },
    { key: 'newest', label: 'Mais Recente', icon: '🆕' },
  ];

  const getSortLabel = (key: SortOption) => {
    return sortOptions.find(option => option.key === key)?.label || 'Ordenar por';
  };

  const renderSortButton = () => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        {
          backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#F8F9FA',
        }
      ]}
      onPress={() => setShowSortOptions(!showSortOptions)}
    >
      <Text style={styles.sortIcon}>🔄</Text>
      <Text style={[styles.sortText, { color: Colors[colorScheme ?? 'light'].text }]}>
        {getSortLabel(sortBy)}
      </Text>
      <Text style={styles.sortArrow}>{showSortOptions ? '▲' : '▼'}</Text>
    </TouchableOpacity>
  );

  const renderSortOptions = () => {
    if (!showSortOptions) return null;

    return (
      <View style={[
        styles.sortOptionsContainer,
        {
          backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
        }
      ]}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.sortOption,
              sortBy === option.key && styles.sortOptionSelected,
            ]}
            onPress={() => {
              setSortBy(option.key as SortOption);
              setShowSortOptions(false);
            }}
          >
            <Text style={styles.sortOptionIcon}>{option.icon}</Text>
            <Text style={[
              styles.sortOptionText,
              sortBy === option.key && styles.sortOptionTextSelected,
              { color: Colors[colorScheme ?? 'light'].text }
            ]}>
              {option.label}
            </Text>
            {sortBy === option.key && (
              <Text style={styles.checkIcon}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].tint }]}>
          {sortedProducts.length}
        </Text>
        <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          Produtos
        </Text>
      </View>

      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].tint }]}>
          {categories.length}
        </Text>
        <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          Categorias
        </Text>
      </View>

      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].tint }]}>
          {sortedProducts.filter(p => p.inStock).length}
        </Text>
        <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          Em Estoque
        </Text>
      </View>
    </View>
  );

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
        <ErrorMessage message={error} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => (
          <View>
            <SearchHeader
              searchQuery=""
              onSearchChange={() => {}}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={filterByCategory}
            />

            {renderStats()}

            <View style={styles.sortContainer}>
              {renderSortButton()}
            </View>

            {renderSortOptions()}

            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Todos os Produtos
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard
              product={item}
              onPress={() => {}}
            />
          </View>
        )}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  sortContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  sortIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sortText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  sortArrow: {
    fontSize: 12,
    color: '#6C757D',
  },
  sortOptionsContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  sortOptionSelected: {
    backgroundColor: 'rgba(0,122,255,0.1)',
  },
  sortOptionIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  sortOptionText: {
    flex: 1,
    fontSize: 16,
  },
  sortOptionTextSelected: {
    fontWeight: '600',
  },
  checkIcon: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
