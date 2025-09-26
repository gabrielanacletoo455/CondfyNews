import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal as RNModal,
  TextInput,
} from 'react-native';
import Divider from '../Divider';
import useNavigationCustom from '@/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/screens/profile/services';
import QUERY_KEYS from '@/config/QUERY_KEYS';
import { UserProfile } from '@/screens/profile/types';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}
import styles from './styles';
import { useDebouncedValue } from '@/utils';
import { Controller, useForm } from 'react-hook-form';

const Modal = ({ visible, onClose }: ModalProps) => {
  const navigation = useNavigationCustom();
  const { setAuthenticated, isAuthenticated } = useAuth();

  // Query para buscar o perfil do usuário
  const { data: userProfile } = useQuery<UserProfile>({
    queryKey: [QUERY_KEYS.PROFILE.GET_PROFILE],
    queryFn: () => getProfile(),
    enabled: isAuthenticated && visible, 
  });

  const { control, getValues } = useForm({
    defaultValues: {
      searchQuery: '',
    },
  });

  const handleLogout = async () => {
    try {
      // Remover token do AsyncStorage
      await AsyncStorage.removeItem('AUTH_TOKEN_CONDFYNEWS');

      // Atualizar estado global para false
      setAuthenticated(false);

      // Fechar modal
      onClose();

      // Navegar para Index
      navigation.reset({
        index: 0,
        routes: [{ name: 'Index' }],
      });
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  const handleSearch = (value: string) => {
    onClose();
    navigation.navigate('Search', { query: value });
  };

  const onSubmitSearch = () => {
    handleSearch(getValues('searchQuery'));
  };

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <View style={styles.modalContent}>
            <Image
              source={require('@/assets/icons/profile.png')}
              style={styles.iconModal}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileDetail', { id: userProfile?.id || 0 });
                onClose();
              }}
              disabled={!isAuthenticated}
              style={!isAuthenticated ? { opacity: 0.5 } : {}}
            >
              <Text style={styles.text}>
                {userProfile?.userName || 'Usuário'}
              </Text>
            </TouchableOpacity>
          </View>

          <Divider color="#222" height={1} marginBottom={10} marginTop={10} />

          <View style={styles.modalContentMiddle}>
            <Image
              source={require('@/assets/icons/plus.png')}
              style={styles.iconModal}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NovoConteudo');
                onClose();
              }}
              disabled={!isAuthenticated}
              style={!isAuthenticated ? { opacity: 0.5 } : {}}
            >
              <Text style={styles.textContent}>Novo conteúdo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContentMiddle}>
            <Image
              source={require('@/assets/icons/myContent.png')}
              style={styles.iconModal}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MeusConteudos');
                onClose();
              }}
              disabled={!isAuthenticated}
              style={!isAuthenticated ? { opacity: 0.5 } : {}}
            >
              <Text style={styles.textContent}>Meus conteúdos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContentMiddle}>
            <Image
              source={require('@/assets/icons/config.png')}
              style={styles.iconModal}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
                onClose();
              }}
              disabled={!isAuthenticated}
              style={!isAuthenticated ? { opacity: 0.5 } : {}}
            >
              <Text style={styles.textContent}>Editar perfil</Text>
            </TouchableOpacity>
          </View>

          <Divider color="#222" height={1} marginBottom={10} marginTop={10} />

          <View style={styles.modalContent}>
            <Image
              source={require('@/assets/icons/magnifyingGlass.png')}
              style={styles.iconModal}
            />
            <Controller
              control={control}
              name="searchQuery"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Pesquisar"
                  placeholderTextColor="#FFF"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  style={styles.textInput}
                  returnKeyType="search"
                  onSubmitEditing={onSubmitSearch}
                  blurOnSubmit
                />
              )}
            />
          </View>

          <Divider color="#222" height={1} marginBottom={10} marginTop={10} />

          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={handleLogout}
              disabled={!isAuthenticated}
              style={!isAuthenticated ? { opacity: 0.5 } : {}}
            >
              <View style={styles.containerLogout}>
                <Image
                  source={require('@/assets/icons/logout.png')}
                  style={styles.iconModal}
                />

                <Text style={styles.textLogout}>Sair</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;
