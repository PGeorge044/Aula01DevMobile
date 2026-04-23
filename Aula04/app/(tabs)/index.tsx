import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

export default function App() {
  // Estados controlados
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // Função de Envio com Validação
  const handleEnviar = () => {
    if (nome.trim() === '') {
      Alert.alert('Ops!', 'O campo Nome é obrigatório.');
      return;
    }
    
    if (email.trim() === '') {
      Alert.alert('Ops!', 'O campo E-mail é obrigatório.');
      return;
    }

    // Se tudo estiver preenchido
    Alert.alert(
      'Dados Recebidos', 
      `Seja bem-vindo, ${nome}!\nEnviamos um link para: ${email}`
    );
  };

  // Função do Desafio Bônus: Limpar
  const handleLimpar = () => {
    setNome('');
    setEmail('');
  };

  return (
    // KeyboardAvoidingView evita que o teclado cubra os campos no iOS/Android
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <StatusBar barStyle="dark-content" />
          
          <View style={styles.header}>
            <Text style={styles.title}>Aula 04</Text>
            <Text style={styles.subtitle}>Formulário de Contato</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Paulo George"
              value={nome}
              onChangeText={setNome}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="exemplo@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />

            {/* Botão Enviar Estilizado */}
            <TouchableOpacity style={styles.btnEnviar} onPress={handleEnviar}>
              <Text style={styles.btnText}>Enviar Dados</Text>
            </TouchableOpacity>

            {/* Botão Limpar (Desafio Bônus) */}
            <TouchableOpacity style={styles.btnLimpar} onPress={handleLimpar}>
              <Text style={[styles.btnText, { color: '#666' }]}>Limpar Campos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    // Sombra para o "projeto bonito"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  btnEnviar: {
    backgroundColor: '#1A73E8',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnLimpar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});