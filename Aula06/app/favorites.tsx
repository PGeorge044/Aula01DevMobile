import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useFavorites, useProducts } from '@/hooks/useApi';
import { ProductCard } from '@/components/ProductCard';
import { LoadingSpinner } from '@/components/ui/Button';

export default function FavoritesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const { favorites, loading: favoritesLoading } = useFavorites();
  const { products } = useProducts();

  const favoriteProducts = useMemo(() => {
    return products.filter(product =>
      favorites.some(fav => fav.productId === product.id)
    );
  }, [products, favorites]);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  if (favoritesLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Meus Favoritos
        </Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          {favoriteProducts.length} produto{favoriteProducts.length !== 1 ? 's' : ''} favoritado{favoriteProducts.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {favoriteProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyEmoji, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
            💔
          </Text>
          <Text style={[styles.emptyTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Nenhum favorito ainda
          </Text>
          <Text style={[styles.emptySubtitle, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
            Adicione produtos aos seus favoritos para vê-los aqui
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.productWrapper}>
              <ProductCard
                product={item}
                onPress={() => handleProductPress(item.id)}
                isFavorite={true}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  listContainer: {
    padding: 8,
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
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});