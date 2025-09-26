import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from 'firebase/storage';
import { app } from '@/config/firebase';

// Upload simples sem conversão
export async function uploadImages(
  file: File | string, 
): Promise<string> {
    try {
        const storage = getStorage(app);
        let imageData: Blob;
        let fileName: string;

        if (typeof file === 'string') {
            // Para React Native - baixa a imagem usando fetch
            const response = await fetch(file);
            imageData = await response.blob();
            fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`;
        } else {
            // Para arquivos File (web)
            imageData = file;
            fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}-${file.name}`;
        }

        // Upload para Firebase Storage
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, imageData);

        // Retorna a URL de download
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
        
    } catch (error) {
        console.error('Erro ao fazer upload da imagem para o Firebase:', error);
        throw new Error('Falha no upload da imagem');
    }
}
