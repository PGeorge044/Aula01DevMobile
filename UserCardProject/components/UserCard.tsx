import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

type Props = {
  nome: string;
  profissao: string;
};

export default function UserCard({ nome, profissao }: Props) {
  const [online, setOnline] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.profissao}>{profissao}</Text>

        <Text style={[styles.status, online ? styles.online : styles.offline]}>
          {online ? '🟢 Online' : '🔴 Offline'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setOnline(!online)}
      >
        <Text style={styles.botaoTexto}>Mudar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#1e1e2f',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,

    // sombra
    elevation: 3,
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  profissao: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 6,
  },

  status: {
    fontSize: 14,
  },

  online: {
    color: 'lime',
  },

  offline: {
    color: 'red',
  },

  botao: {
    backgroundColor: '#4a90e2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});