// src/screens/ChatIAScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { perguntarParaIA } from '../services/openaiServices';

interface Mensagem {
  id: string;
  texto: string;
  origem: 'usuario' | 'ia';
}

export default function ChatIAScreen() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [texto, setTexto] = useState('');
  const [carregando, setCarregando] = useState(false);

  const enviarMensagem = async () => {
    if (!texto.trim()) return;

    const novaPergunta: Mensagem = {
      id: Date.now().toString(),
      texto,
      origem: 'usuario',
    };

    setMensagens((prev) => [...prev, novaPergunta]);
    setTexto('');
    setCarregando(true);

    const resposta = await perguntarParaIA(novaPergunta.texto);

    const respostaIA: Mensagem = {
      id: (Date.now() + 1).toString(),
      texto: resposta,
      origem: 'ia',
    };

    setMensagens((prev) => [...prev, respostaIA]);
    setCarregando(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[styles.mensagem, item.origem === 'usuario' ? styles.usuario : styles.ia]}
          >
            <Text style={styles.texto}>{item.texto}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
      />

      {carregando && <ActivityIndicator size="small" color="#007bff" style={{ marginBottom: 10 }} />}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descreva o problema..."
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity style={styles.botao} onPress={enviarMensagem} disabled={carregando}>
          <Text style={styles.botaoTexto}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  mensagem: {
    margin: 10,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
  },
  usuario: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  ia: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  texto: { color: '#000' },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  botao: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
