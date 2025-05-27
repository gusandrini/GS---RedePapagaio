import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Usuario {
  nome: string;
  tipo: 'Voluntário' | 'Pessoa Afetada' | 'Instituição';
  cpf: string;
  reputacao: number; // de 0 a 5
}

const mockUsuario: Usuario = {
  nome: 'João da Silva',
  tipo: 'Voluntário',
  cpf: '123.456.789-00',
  reputacao: 4.5,
};

export default function ProfileScreen() {
  const [usuario, setUsuario] = useState<Usuario>(mockUsuario);
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(usuario.nome);
  const [novoTipo, setNovoTipo] = useState(usuario.tipo);

  const salvarEdicao = () => {
    setUsuario({ ...usuario, nome: novoNome, tipo: novoTipo });
    setEditando(false);
    Alert.alert('Perfil atualizado', 'As informações foram salvas com sucesso.');
    // Futuro: fazer PUT /usuario/:id na API
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        {editando ? (
          <TextInput style={styles.input} value={novoNome} onChangeText={setNovoNome} />
        ) : (
          <Text style={styles.value}>{usuario.nome}</Text>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Tipo:</Text>
        {editando ? (
          <Picker selectedValue={novoTipo} onValueChange={setNovoTipo} style={styles.picker}>
            <Picker.Item label="Voluntário" value="Voluntário" />
            <Picker.Item label="Pessoa Afetada" value="Pessoa Afetada" />
            <Picker.Item label="Instituição" value="Instituição" />
          </Picker>
        ) : (
          <Text style={styles.value}>{usuario.tipo}</Text>
        )}
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.value}>{usuario.cpf}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Reputação:</Text>
        <Text style={styles.value}>{'⭐'.repeat(Math.round(usuario.reputacao))} ({usuario.reputacao})</Text>
      </View>

      <View style={styles.buttonContainer}>
        {editando ? (
          <>
            <Button title="Salvar" onPress={salvarEdicao} color="#28a745" />
            <View style={{ marginVertical: 10 }} />
            <Button title="Cancelar" onPress={() => setEditando(false)} color="#6c757d" />
          </>
        ) : (
          <Button title="Editar perfil" onPress={() => setEditando(true)} color="#007bff" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  infoBox: { marginBottom: 15 },
  label: { fontWeight: 'bold', fontSize: 16 },
  value: { fontSize: 16, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginTop: 4,
    backgroundColor: '#fff',
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  buttonContainer: { marginTop: 30 },
});
