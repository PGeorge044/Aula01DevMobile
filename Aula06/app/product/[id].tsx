import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useProductDetails, useFavorites } from '@/hooks/useApi';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui/Button';

const { width, height } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const { product, loading, error, refetch } = useProductDetails(id!);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

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

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('⭐');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('⭐');
      } else {
        stars.push('☆');
      }
    }

    return stars.join('');
  };

  const handleFavoritePress = () => {
    if (!product) return;

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const handleShare = async () => {
    if (!product) return;

    try {
      await Share.share({
        message: `Confira este produto incrível: ${product.name} - ${formatPrice(product.price)}`,
        url: `https://store.com/product/${product.id}`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  const handleAddToCart = () => {
    // Simulação de adicionar ao carrinho
    alert('Produto adicionado ao carrinho! 🛒');
  };

  if (loading === 'loading') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <LoadingSpinner />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>←</Text>
          </TouchableOpacity>
        </View>
        <ErrorMessage message={error || 'Produto não encontrado'} onRetry={refetch} />
      </SafeAreaView>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Text style={styles.actionIcon}>📤</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleFavoritePress}
            >
              <Text style={styles.actionIcon}>
                {isFavorite(product.id) ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />

          {!product.inStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>ESGOTADO</Text>
            </View>
          )}

          {discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discountPercentage}%</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={[styles.productName, { color: Colors[colorScheme ?? 'light'].text }]}>
              {product.name}
            </Text>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>

          <View style={styles.ratingSection}>
            <Text style={styles.stars}>{renderStars(product.rating)}</Text>
            <Text style={[styles.reviews, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
              {product.reviews} avaliações
            </Text>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.currentPrice}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
            )}
          </View>

          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Descrição
            </Text>
            <Text style={[styles.description, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
              {product.description}
            </Text>
          </View>

          <View style={styles.tagsSection}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Tags
            </Text>
            <View style={styles.tagsContainer}>
              {product.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.metaSection}>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
                Em estoque
              </Text>
              <Text style={[styles.metaValue, { color: product.inStock ? '#28A745' : '#DC3545' }]}>
                {product.inStock ? 'Sim' : 'Não'}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
                Atualizado em
              </Text>
              <Text style={[styles.metaValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                {new Date(product.updatedAt).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomContainer, {
        backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
        borderTopColor: colorScheme === 'dark' ? '#2C2C2E' : '#E9ECEF',
      }]}>
        <View style={styles.bottomContent}>
          <View style={styles.priceSummary}>
            <Text style={[styles.totalLabel, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
              Total
            </Text>
            <Text style={[styles.totalPrice, { color: Colors[colorScheme ?? 'light'].text }]}>
              {formatPrice(product.price)}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <Button
              title="Adicionar ao Carrinho"
              onPress={handleAddToCart}
              variant="primary"
              size="lg"
              disabled={!product.inStock}
              style={styles.cartButton}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionIcon: {
    fontSize: 18,
  },
  imageContainer: {
    position: 'relative',
    width: width,
    height: height * 0.4,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#DC3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 32,
  },
  categoryBadge: {
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    fontSize: 16,
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#28A745',
  },
  originalPrice: {
    fontSize: 18,
    color: '#6C757D',
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  tagsSection: {
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  metaSection: {
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  metaLabel: {
    fontSize: 14,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  bottomContainer: {
    borderTopWidth: 1,
    paddingBottom: 34, // Account for safe area
  },
  bottomContent: {
    padding: 16,
  },
  priceSummary: {
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  cartButton: {
    flex: 1,
  },
});