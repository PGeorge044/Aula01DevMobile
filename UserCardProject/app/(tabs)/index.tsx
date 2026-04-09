import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import UserCard from '../../components/UserCard';

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Time de Membros</Text>
        <Text style={styles.subtitle}>Gerencie o stats da sua equipe</Text>

        <View style={styles.list}>
          <UserCard nome="Bianca" profissao="Dev Frontend" />
          <UserCard nome="George" profissao="Mobile Developer" />
          <UserCard nome="Gustavo" profissao="UI/UX Designer" />
          <UserCard nome="Duda" profissao="Product Manager" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A', // Fundo escuro moderno
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 32,
  },
  list: {
    width: '100%',
  },
});