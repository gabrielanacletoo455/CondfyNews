import { CommonButton, Container, Divider } from '@/components';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { useMutation } from '@tanstack/react-query';
import AuthLogin, { AuthLoginProps } from './services';
import { Controller, useForm } from 'react-hook-form';
import useNavigationCustom from '@/hooks';
import { useCallback, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Login = () => {
  const navigation = useNavigationCustom();
  const { setAuthenticated } = useAuth();
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // hookform
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<AuthLoginProps>();

  useFocusEffect(
    useCallback(() => {
      const loadStoredData = async () => {
        try {
          const email = await AsyncStorage.getItem('EMAIL_CONDFYNEWS');
          const password = await AsyncStorage.getItem('PASSWORD_CONDFYNEWS');
          setRemember(!!email && !!password);
          setValue('email', email || '');
          setValue('password', password || '');
        } catch (error) {
          console.log('Erro ao carregar dados salvos:', error);
        }
      };
      
      loadStoredData();
    }, [setValue])
  );

  const { mutate: login, isPending } = useMutation({
    mutationFn: AuthLogin,
    onSuccess: () => {
      setAuthenticated(true); 
      navigation.navigate('Index');
    },
    onError: (error: any) => {
      console.log('Erro ao realizar login', error);
    },
  });

  const onSubmit = (data: AuthLoginProps) => {
    if (remember) {
      AsyncStorage.setItem('EMAIL_CONDFYNEWS', data.email);
      AsyncStorage.setItem('PASSWORD_CONDFYNEWS', data.password);
      } else {
        AsyncStorage.removeItem('EMAIL_CONDFYNEWS');
        AsyncStorage.removeItem('PASSWORD_CONDFYNEWS');
      }
    login(data);
  };

  return (
    <Container>
      <Text style={styles.text}>Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.textInput}>Seu Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Digite seu email"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholderTextColor="#888888" 
            />
          )}
        />

        <Text style={styles.textPassword}>Seu Senha</Text>
        <Controller
    control={control}
    name="password"
    render={({ field: { onChange, onBlur, value } }) => (
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          autoCapitalize="none"
          autoCorrect={false}
          // secureTextEntry={!showPassword}
          placeholder="Digite sua senha"
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          placeholderTextColor="#888888" 
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.eyeIcon}>
            {showPassword ? <MaterialIcons name="visibility-off" size={24} color="#6A5ACD" /> : <MaterialIcons name="visibility" size={24} color="#6A5ACD" />}
          </Text>
        </TouchableOpacity>
      </View>
    )}
  />
      </View>

      <View style={styles.containerRemember}>
        <TouchableOpacity
          style={styles.buttonRemember}
          onPress={() => setRemember(!remember)}
        >
          <CheckBox
            disabled={false}
            value={remember}
            tintColors={{
              true: '#6A5ACD',   
              false: '#666666'    
            }}
            onValueChange={newValue => setRemember(newValue)}
          />
          <Text style={styles.textRemember}>Lembrar-me</Text>
        </TouchableOpacity>
      </View>

      <CommonButton
        text="Entrar"
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        loading={isPending}
      />

      <View style={styles.containerBottom}>
        <Text style={styles.textBottom}>Novo no condfyNews?</Text>
        <TouchableOpacity style={styles.buttonBottom} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.textButton}>Crie sua conta aqui</Text>
        </TouchableOpacity>
      </View>

      <Divider height={1} marginTop={10} color="#444" marginBottom={20} />

      <Text style={styles.textYear}>
        {new Date().getFullYear()} - CondfyNews
      </Text>
    </Container>
  );
};

export default Login;
