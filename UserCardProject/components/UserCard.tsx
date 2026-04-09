import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Definição das interfaces para o TypeScript
interface UserCardProps {
  nome: string;
  profissao: string;
}

export default function UserCard({ nome, profissao }: UserCardProps) {
  // Estado para controlar se o usuário está online
  const [isOnline, setIsOnline] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{nome}</Text>
        <Text style={styles.job}>{profissao}</Text>
        
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: isOnline ? '#4ADE80' : '#94A3B8' }]} />
          <Text style={styles.statusText}>{isOnline ? 'Disponível' : 'Indisponível'}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.button, isOnline ? styles.buttonActive : styles.buttonInactive]} 
        onPress={() => setIsOnline(!isOnline)}
      >
        <Text style={styles.buttonText}>
          {isOnline ? 'Ficar Offline' : 'Ficar Online'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  job: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#CBD5E1',
    fontSize: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonActive: {
    backgroundColor: '#EF4444', // Vermelho para "deslogar"
  },
  buttonInactive: {
    backgroundColor: '#3B82F6', // Azul para "logar"
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});