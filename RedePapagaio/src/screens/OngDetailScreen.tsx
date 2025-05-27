// src/screens/OngDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  OngDetail: { id: string; nome: string; cidade: string };
};

type OngDetailRouteProp = RouteProp<RootStackParamList, 'OngDetail'>;

export default function OngDetailScreen() {
  const route = useRoute<OngDetailRouteProp>();
  const { nome, cidade } = route.params;

  const handleContato = () => {
    Alert.alert('Contato', `Entrando em contato com ${nome}...`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <Text style={styles.subtitle}>Local: {cidade}</Text>

      <View style={styles.button}>
        <Button title="Ver contato" onPress={handleContato} />
      </View>

      <View style={styles.button}>
        <Button title="Mais detalhes" onPress={() => Alert.alert('Em breve!', 'Funcionalidade em desenvolvimento.')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#f2f2f2' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 30, color: '#555' },
  button: { marginVertical: 10 },
});
