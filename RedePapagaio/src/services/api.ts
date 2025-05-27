import axios from 'axios';

// Defina sua variável de ambiente no arquivo .env na raiz do projeto
const baseURL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// (Opcional) Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use(async (config) => {
  // Exemplo usando expo-secure-store ou AsyncStorage
  // const token = await SecureStore.getItemAsync('token');
  const token = ''; // substituir por lógica real

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
