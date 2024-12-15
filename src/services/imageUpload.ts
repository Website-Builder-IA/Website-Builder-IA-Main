import { encode } from 'base64-arraybuffer';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          const base64 = encode(reader.result);
          resolve(`data:${file.type};base64,${base64}`);
        } else if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Falha ao converter imagem'));
        }
      };
      
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw new Error('Erro ao fazer upload da imagem. Por favor, tente novamente.');
  }
};