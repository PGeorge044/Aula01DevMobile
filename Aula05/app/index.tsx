import { useRouter } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface Item {
  id: string;
  title: string;
  description: string;
}

const items: Item[] = [
  { id: '1', title: 'Produto 1', description: 'Descrição do primeiro item' },
  { id: '2', title: 'Produto 2', description: 'Descrição do segundo item' },
  { id: '3', title: 'Produto 3', description: 'Descrição do terceiro item' },
  { id: '4', title: 'Produto 4', description: 'Descrição do quarto item' },
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleItemPress = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Tela Home</ThemedText>
        <ThemedText style={styles.subtitle}>Escolha um item para ver detalhes</ThemedText>
      </ThemedView>

      <ScrollView style={styles.itemList}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleItemPress(item.id)}
            style={[
              styles.itemButton,
              {
                backgroundColor:
                  colorScheme === 'dark'
                    ? Colors.dark.tint + '20'
                    : Colors.light.tint + '20',
              },
            ]}>
            <ThemedView style={styles.itemContent}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.itemId}>ID: {item.id}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
  itemList: {
    flex: 1,
  },
  itemButton: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 0,
  },
  itemContent: {
    backgroundColor: 'transparent',
  },
  itemDescription: {
    marginTop: 8,
    opacity: 0.6,
    fontSize: 14,
  },
  itemId: {
    marginTop: 4,
    opacity: 0.5,
    fontSize: 12,
  },
});
