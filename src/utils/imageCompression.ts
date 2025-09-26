
export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  maxSizeKB?: number;
}

export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.8,
    format = 'jpeg',
    maxSizeKB = 500
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        // Calcular novas dimensões mantendo aspect ratio
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Desenhar imagem redimensionada
        ctx?.drawImage(img, 0, 0, width, height);

        // Converter para blob com qualidade especificada
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Falha na compressão da imagem'));
              return;
            }

            // Verificar se o tamanho está dentro do limite
            const sizeKB = blob.size / 1024;
            
            if (sizeKB <= maxSizeKB) {
              // Criar novo arquivo com o blob comprimido
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, `.${format}`),
                {
                  type: `image/${format}`,
                  lastModified: Date.now()
                }
              );
              resolve(compressedFile);
            } else {
              // Se ainda está muito grande, tentar com qualidade menor
              const newQuality = Math.max(0.1, quality * 0.8);
              compressImage(file, { ...options, quality: newQuality })
                .then(resolve)
                .catch(reject);
            }
          },
          `image/${format}`,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Falha ao carregar imagem'));
    img.src = URL.createObjectURL(file);
  });
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSizeBytes = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Tipo de arquivo não suportado. Use JPEG, PNG, WebP ou GIF.');
  }

  if (file.size > maxSizeBytes) {
    throw new Error('Arquivo muito grande. Máximo 10MB.');
  }

  return true;
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error('Falha ao carregar imagem'));
    img.src = URL.createObjectURL(file);
  });
};

export const createImageThumbnail = async (
  file: File,
  size: number = 150
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;

      // Criar thumbnail quadrado
      const minDimension = Math.min(img.width, img.height);
      const x = (img.width - minDimension) / 2;
      const y = (img.height - minDimension) / 2;

      ctx?.drawImage(
        img,
        x, y, minDimension, minDimension, // source
        0, 0, size, size // destination
      );

      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };

    img.onerror = () => reject(new Error('Falha ao criar thumbnail'));
    img.src = URL.createObjectURL(file);
  });
};

// --- Crop & Rotate helpers ---

export type PixelCrop = { x: number; y: number; width: number; height: number };

const toRadian = (degree: number): number => (degree * Math.PI) / 180;

const loadImageFromSrc = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = (e) => reject(e);
    image.src = src;
  });
};

const getRotatedSize = (
  width: number,
  height: number,
  rotation: number
): { width: number; height: number } => {
  const rotRad = toRadian(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export const cropAndRotateImageFromUrl = async (
  imageUrl: string,
  pixelCrop: PixelCrop,
  rotation: number = 0,
  format: 'jpeg' | 'png' | 'webp' = 'webp',
  quality: number = 0.92
): Promise<File> => {
  const image = await loadImageFromSrc(imageUrl);

  const rotRad = toRadian(rotation);
  const { width: bWidth, height: bHeight } = getRotatedSize(image.width, image.height, rotation);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context inválido');

  canvas.width = Math.round(bWidth);
  canvas.height = Math.round(bHeight);

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotRad);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  // Agora recorta a área desejada para um segundo canvas
  const cropCanvas = document.createElement('canvas');
  const cropCtx = cropCanvas.getContext('2d');
  if (!cropCtx) throw new Error('Canvas context inválido');

  cropCanvas.width = Math.round(pixelCrop.width);
  cropCanvas.height = Math.round(pixelCrop.height);

  cropCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  const blob: Blob | null = await new Promise((resolve) =>
    cropCanvas.toBlob((b) => resolve(b), `image/${format}`, quality)
  );
  if (!blob) {
    throw new Error('Falha ao gerar imagem recortada');
  }
  const file = new File([blob], `image-${Date.now()}.${format}`, {
    type: `image/${format}`,
    lastModified: Date.now(),
  });
  return file;
};