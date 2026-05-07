import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const detailsMap: Record<string, { title: string; description: string; content: string }> = {
  '1': {
    title: 'Produto 1',
    description: 'Descrição do primeiro item',
    content:
      'Este é o conteúdo detalhado do Produto 1. Aqui você pode adicionar mais informações específicas sobre este item.',
  },
  '2': {
    title: 'Produto 2',
    description: 'Descrição do segundo item',
    content:
      'Este é o conteúdo detalhado do Produto 2. Você está visualizando a página de detalhes com a rota dinâmica funcionando!',
  },
  '3': {
    title: 'Produto 3',
    description: 'Descrição do terceiro item',
    content:
      'Este é o conteúdo detalhado do Produto 3. A navegação com parâmetros está funcionando corretamente.',
  },
  '4': {
    title: 'Produto 4',
    description: 'Descrição do quarto item',
    content:
      'Este é o conteúdo detalhado do Produto 4. Use o botão "Voltar" para retornar à Home.',
  },
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const details = id ? detailsMap[id] : null;

  if (!details) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>Produto não encontrado</ThemedText>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.button,
            {
              backgroundColor:
                colorScheme === 'dark'
                  ? Colors.dark.tint
                  : Colors.light.tint,
            },
          ]}>
          <ThemedText style={styles.buttonText}>Voltar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">{details.title}</ThemedText>
        <ThemedText style={styles.idBadge}>ID: {id}</ThemedText>
      </View>

      <ThemedView style={styles.content}>
        <ThemedText type="subtitle">{details.description}</ThemedText>
        <ThemedText style={styles.description}>{details.content}</ThemedText>

        <ThemedView style={styles.parameterInfo}>
          <ThemedText style={styles.parameterLabel}>Parâmetro recebido:</ThemedText>
          <ThemedText
            style={[
              styles.parameterValue,
              {
                color:
                  colorScheme === 'dark'
                    ? Colors.dark.tint
                    : Colors.light.tint,
              },
            ]}>
            id = "{id}"
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.button,
            {
              backgroundColor:
                colorScheme === 'dark'
                  ? Colors.dark.tint
                  : Colors.light.tint,
            },
          ]}>
          <ThemedText style={styles.buttonText}>← Voltar</ThemedText>
        </TouchableOpacity>
      </View>
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
  idBadge: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    marginVertical: 16,
  },
  description: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  parameterInfo: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  parameterLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  parameterValue: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#ff6b6b',
  },
});
