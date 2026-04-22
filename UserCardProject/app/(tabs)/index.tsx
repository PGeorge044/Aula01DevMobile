import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserCard from '../../components/UserCard';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Usuários</Text>

      <ScrollView>
        <UserCard nome="Paulo George" profissao="Programador" />
        <UserCard nome="Bianca Alves" profissao="Designer" />
        <UserCard nome="Gustavo Fernando" profissao="Gestor" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
});