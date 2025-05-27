// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo(a) à RedePapagaio 🦜</Text>
      <Text style={styles.subtext}>Conectando ajuda em situações extremas</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatIA')}>
        <Text style={styles.buttonText}>Abrir Chat de Emergência com IA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtext: { fontSize: 16, color: '#555', marginBottom: 30, textAlign: 'center' },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
