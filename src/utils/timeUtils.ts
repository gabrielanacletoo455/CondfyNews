import React from "react";

interface TimeAgoOptions {
    includeSeconds?: boolean;
    useStrict?: boolean;
  }
  
  /**
   * Converte uma data para formato "X tempo atrás"
   * @param date - Data a ser convertida
   * @param options - Opções de formatação
   * @returns String formatada (ex: "2 dias atrás", "1 semana atrás")
   */
  export const getTimeAgo = (date: string | Date, options: TimeAgoOptions = {}): string => {
    const { includeSeconds = false, useStrict = false } = options;
    
    const now = new Date();
    const pastDate = new Date(date);
    
    // Verifica se a data é válida
    if (isNaN(pastDate.getTime())) {
      return 'Data inválida';
    }
    
    const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);
    
    // Se a data é no futuro
    if (diffInSeconds < 0) {
      return 'Agora';
    }
    
    // Menos de 1 minuto
    if (diffInSeconds < 60) {
      return includeSeconds ? `${diffInSeconds} segundos atrás` : 'Agora';
    }
    
    // Menos de 1 hora
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return diffInMinutes === 1 ? '1 minuto atrás' : `${diffInMinutes} minutos atrás`;
    }
    
    // Menos de 1 dia
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return diffInHours === 1 ? '1 hora atrás' : `${diffInHours} horas atrás`;
    }
    
    // Menos de 1 semana
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return diffInDays === 1 ? '1 dia atrás' : `${diffInDays} dias atrás`;
    }
    
    // Menos de 1 mês
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return diffInWeeks === 1 ? '1 semana atrás' : `${diffInWeeks} semanas atrás`;
    }
    
    // Menos de 1 ano
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return diffInMonths === 1 ? '1 mês atrás' : `${diffInMonths} meses atrás`;
    }
    
    // Mais de 1 ano
    const diffInYears = Math.floor(diffInDays / 365);
    return diffInYears === 1 ? '1 ano atrás' : `${diffInYears} anos atrás`;
  };
  
  /**
   * Hook para atualizar o tempo relativo automaticamente
   * @param date - Data a ser monitorada
   * @param updateInterval - Intervalo de atualização em ms (padrão: 60000 = 1 minuto)
   * @returns String do tempo relativo que atualiza automaticamente
   */
  export const useTimeAgo = (date: string | Date, updateInterval: number = 60000): string => {
    const [timeAgo, setTimeAgo] = React.useState(() => getTimeAgo(date));
    
    React.useEffect(() => {
      // Atualiza imediatamente
      setTimeAgo(getTimeAgo(date));
      
      // Configura intervalo para atualizações
      const interval = setInterval(() => {
        setTimeAgo(getTimeAgo(date));
      }, updateInterval);
      
      return () => clearInterval(interval);
    }, [date, updateInterval]);
    
    return timeAgo;
  };

/**
 * Calcula o tempo estimado de leitura baseado no conteúdo
 * @param content - Conteúdo do texto a ser analisado
 * @param wordsPerMinute - Palavras por minuto (padrão: 200 - média para leitura em português)
 * @returns String formatada do tempo de leitura (ex: "2 min de leitura", "1h 30min de leitura")
 */
export const getReadingTime = (content: string, wordsPerMinute: number = 200): string => {
  if (!content || content.trim().length === 0) {
    return '0 min de leitura';
  }

  // Remove HTML tags e caracteres especiais, mantém apenas texto
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[^\w\s]/g, ' ') // Remove pontuação, mantém apenas letras, números e espaços
    .replace(/\s+/g, ' ') // Remove espaços múltiplos
    .trim();

  // Conta palavras (divide por espaços)
  const wordCount = cleanContent.split(' ').filter(word => word.length > 0).length;
  
  // Calcula tempo em minutos
  const readingTimeInMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  // Se menos de 1 minuto, mostra em segundos
  if (readingTimeInMinutes < 1) {
    const seconds = Math.ceil((wordCount / wordsPerMinute) * 60);
    return `${seconds} seg de leitura`;
  }
  
  // Se menos de 1 hora, mostra em minutos
  if (readingTimeInMinutes < 60) {
    return readingTimeInMinutes === 1 
      ? '1 min de leitura' 
      : `${readingTimeInMinutes} min de leitura`;
  }
  
  // Se 1 hora ou mais, mostra em horas e minutos
  const hours = Math.floor(readingTimeInMinutes / 60);
  const minutes = readingTimeInMinutes % 60;
  
  if (minutes === 0) {
    return hours === 1 ? '1h de leitura' : `${hours}h de leitura`;
  }
  
  return `${hours}h ${minutes}min de leitura`;
};

/**
 * Hook para calcular tempo de leitura com atualização automática
 * @param content - Conteúdo do texto
 * @param wordsPerMinute - Palavras por minuto (padrão: 200)
 * @returns String do tempo de leitura
 */
export const useReadingTime = (content: string, wordsPerMinute: number = 200): string => {
  return React.useMemo(() => getReadingTime(content, wordsPerMinute), [content, wordsPerMinute]);
};