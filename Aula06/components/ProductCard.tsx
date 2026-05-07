import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Product } from '@/types';
import { Card } from './ui/Button';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  compact?: boolean;
}

export function ProductCard({
  product,
  onPress,
  onFavoritePress,
  isFavorite = false,
  compact = false,
}: ProductCardProps) {
  const colorScheme = useColorScheme();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }

    if (hasHalfStar) {
      stars.push('⭐');
    }

    return stars.join('');
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={[
          styles.compactCard,
          {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
          },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image source={{ uri: product.image }} style={styles.compactImage} />
        <View style={styles.compactContent}>
          <Text
            style={[styles.compactTitle, { color: Colors[colorScheme ?? 'light'].text }]}
            numberOfLines={1}
          >
            {product.name}
          </Text>
          <Text style={styles.compactPrice}>{formatPrice(product.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {!product.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Esgotado</Text>
          </View>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Text>
          </View>
        )}
        {onFavoritePress && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Text
          style={[styles.description, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}
          numberOfLines={2}
        >
          {product.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
          )}
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(product.rating)}</Text>
          <Text style={[styles.reviews, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
            ({product.reviews})
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          {product.tags.slice(0, 2).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}

interface ProductListProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  onFavoritePress?: (product: Product) => void;
  favorites?: string[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onEndReached?: () => void;
  ListHeaderComponent?: React.ComponentType<any>;
}

export function ProductList({
  products,
  onProductPress,
  onFavoritePress,
  favorites = [],
  loading,
  error,
  onRetry,
  onEndReached,
  ListHeaderComponent,
}: ProductListProps) {
  const colorScheme = useColorScheme();

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, { color: '#DC3545' }]}>{error}</Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={[styles.retryText, { color: Colors[colorScheme ?? 'light'].tint }]}>
              Tentar Novamente
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {ListHeaderComponent && <ListHeaderComponent />}

      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => onProductPress(product)}
            onFavoritePress={onFavoritePress ? () => onFavoritePress(product) : undefined}
            isFavorite={favorites.includes(product.id)}
          />
        ))}
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
            Carregando mais produtos...
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    width: cardWidth,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#DC3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#28A745',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28A745',
  },
  originalPrice: {
    fontSize: 12,
    color: '#6C757D',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    fontSize: 12,
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#6C757D',
    fontWeight: '500',
  },
  compactCard: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  compactImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  compactContent: {
    flex: 1,
    justifyContent: 'center',
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  compactPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28A745',
  },
  listContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#6C757D',
  },
});