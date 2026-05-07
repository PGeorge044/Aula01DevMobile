import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Category } from '@/types';

const { width } = Dimensions.get('window');

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect: (categoryId?: string) => void;
  loading?: boolean;
}

export function SearchHeader({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategorySelect,
  loading = false,
}: SearchHeaderProps) {
  const colorScheme = useColorScheme();
  const [showCategories, setShowCategories] = useState(false);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={[
        styles.searchContainer,
        {
          backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#F8F9FA',
        }
      ]}>
        <TextInput
          style={[
            styles.searchInput,
            {
              color: Colors[colorScheme ?? 'light'].text,
              backgroundColor: colorScheme === 'dark' ? '#2C2C2E' : '#FFFFFF',
            }
          ]}
          placeholder="Buscar produtos..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={searchQuery}
          onChangeText={onSearchChange}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowCategories(!showCategories)}
        >
          <View style={styles.filterIcon}>
            <View style={styles.filterLine} />
            <View style={styles.filterLine} />
            <View style={styles.filterLine} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      {showCategories && (
        <View style={[
          styles.categoriesContainer,
          {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
          }
        ]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                !selectedCategory && styles.categoryChipSelected,
                {
                  backgroundColor: !selectedCategory
                    ? Colors[colorScheme ?? 'light'].tint
                    : colorScheme === 'dark' ? '#2C2C2E' : '#F8F9FA',
                }
              ]}
              onPress={() => onCategorySelect(undefined)}
            >
              <Text style={[
                styles.categoryText,
                !selectedCategory && styles.categoryTextSelected,
                {
                  color: !selectedCategory
                    ? '#FFFFFF'
                    : Colors[colorScheme ?? 'light'].text,
                }
              ]}>
                Todos
              </Text>
            </TouchableOpacity>

            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipSelected,
                  {
                    backgroundColor: selectedCategory === category.id
                      ? category.color
                      : colorScheme === 'dark' ? '#2C2C2E' : '#F8F9FA',
                  }
                ]}
                onPress={() => onCategorySelect(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextSelected,
                  {
                    color: selectedCategory === category.id
                      ? '#FFFFFF'
                      : Colors[colorScheme ?? 'light'].text,
                  }
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingBar}>
          <View style={[
            styles.loadingProgress,
            { backgroundColor: Colors[colorScheme ?? 'light'].tint }
          ]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 12,
    padding: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filterIcon: {
    width: 16,
    height: 12,
    justifyContent: 'space-between',
  },
  filterLine: {
    height: 2,
    backgroundColor: '#6C757D',
    borderRadius: 1,
  },
  categoriesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryChipSelected: {
    borderColor: 'transparent',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  loadingBar: {
    height: 2,
    backgroundColor: '#E9ECEF',
  },
  loadingProgress: {
    height: '100%',
    width: '30%',
    borderRadius: 1,
  },
});