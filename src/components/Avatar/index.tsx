import { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';




interface AvatarProps {
  username: string;
  size: number;
  photoProfile?: string;
}
function getInitials(username: string) {
  return username
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
}
const Avatar = ({ username, size = 35, photoProfile }: AvatarProps) => {
  const [hasError, setHasError] = useState(false);



  const source = photoProfile
  ? { uri: photoProfile }
  : { uri: `https://api.dicebear.com/6.x/adventurer-neutral/png?seed=${username}` };

    
  return (
    <TouchableOpacity>
      {source ? (
        <Image
          source={source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
          onError={() => {
            console.log('Erro ao carregar imagem, mostrando iniciais');
            setHasError(true);
          }}
        />
      ) : (
        <Text style={{ color: '#555', fontWeight: 'bold', fontSize: 20 }}>
          {getInitials(username || '')}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
