import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

console.log('API KEY carregada:', apiKey);

export const perguntarParaIA = async (mensagem: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Você é um assistente de emergência que responde de forma direta, objetiva e em português para pessoas em risco em desastres naturais.',
          },
          { role: 'user', content: mensagem },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    const openaiError = error.response?.data?.error?.message;
    console.error('Erro ao conectar com OpenAI:', openaiError || error.message);

    if (error.response?.status === 429) {
      return 'Limite de uso da IA excedido. Tente novamente mais tarde ou use uma conta diferente.';
    }

    return 'Desculpe, não consegui gerar uma resposta agora. Tente novamente em instantes.';
  }
};
