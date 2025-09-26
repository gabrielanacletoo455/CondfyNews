import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import useNavigationCustom from '@/hooks';
import { useCallback, useEffect, useState } from 'react';
import Modal from '../Modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '@/contexts/AuthContext';
import { navigationRef } from '@/routes/routes';
const menuSize = 24;
const menuColor = '#FFF';

const Toolbar = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigation = useNavigationCustom();
  const [openModal, setOpenModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const [routeName, setRouteName] = useState(
    navigationRef.isReady() ? navigationRef.getCurrentRoute()?.name : undefined,
  );

  useEffect(() => {
    if (!navigationRef.addListener) return undefined;

    const unsubscribe = navigationRef.addListener('state', () => {
      setRouteName(navigationRef.getCurrentRoute()?.name);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {}, [isLoading, isAuthenticated, openModal]);

  const isRouteActive = (name: string) => routeName === name;

  const handleModalPress = () => {
    setOpenModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentToolbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Relevantes')}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Relevantes')}>
          <Text
            style={[
              styles.text,
              isRouteActive('Relevantes') && styles.textActive,
            ]}
          >
            Relevantes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Recentes')}>
          <Text
            style={[
              styles.text,
              isRouteActive('Recentes') && styles.textActive,
            ]}
          >
            Recentes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Só renderiza quando não está carregando */}
      {!isLoading && (
        <>
          {!isAuthenticated ? (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.textLogin}>Entrar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleModalPress}>
              <MaterialIcons name="menu" size={menuSize} color={menuColor} style={styles.menuIcon} />
            </TouchableOpacity>
          )}
        </>
      )}

      {openModal && (
        <Modal visible={openModal} onClose={() => setOpenModal(false)} />
      )}
    </View>
  );
};

export default Toolbar;
