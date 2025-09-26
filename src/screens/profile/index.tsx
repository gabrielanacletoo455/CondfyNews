import { Container, Loading, MainTitle, Avatar, CommonButton } from '@/components';
import useNavigationCustom from '@/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { ProfileFormData, UserProfile } from './types';
import QUERY_KEYS from '@/config/QUERY_KEYS';
import { getProfile, updateProfile } from './services';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { requestPhotosPermission } from '@/utils/permissions';
import { launchImageLibrary, Asset, ImageLibraryOptions } from 'react-native-image-picker';
import { uploadImages } from '@/utils/upload';

const Profile = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigationCustom();

  const { data: profile, isLoading } = useQuery<UserProfile>({
    queryKey: [QUERY_KEYS.PROFILE.GET_PROFILE],
    queryFn: () => getProfile(),
  });

  const { control, handleSubmit, reset, setValue } = useForm<ProfileFormData>({
    defaultValues: {
      userName: '',
      email: '',
      bioDescription: '',
      instagram: '',
      linkedin: '',
      website: '',
      twitter: '',       // mantém valor mesmo sem campo
      whatsapp: '',      // mantém valor mesmo sem campo
      photoProfile: '',
    },
  });

  const [localPhoto, setLocalPhoto] = useState<string>('');
  const [selectingImage, setSelectingImage] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      reset({
        userName: profile.userName || '',
        email: profile.email || '',
        bioDescription: profile.bioDescription || '',
        instagram: profile.instagram || '',
        linkedin: profile.linkedin || '',
        website: profile.website || '',
        twitter: profile.twitter || '',
        whatsapp: profile.whatsapp || '',
        photoProfile: profile.photoProfile || '',
      });
    }
  }, [profile, reset]);

  const avatarUsername = useMemo(() => profile?.userName || '', [profile]);
  const avatarSize = 100;
  const avatarPhoto = useMemo(() => {
    return localPhoto || profile?.photoProfile || '';
  }, [localPhoto, profile]);

  const pickerOptions: ImageLibraryOptions = useMemo(
    () => ({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
    }),
    []
  );

  const handlePickImage = useCallback(async () => {
    setSelectingImage(true);
    try {
      const { granted } = await requestPhotosPermission();
      if (!granted) {
        setSelectingImage(false);
        return;
      }
      const result = await launchImageLibrary(pickerOptions);
      if (result.didCancel) {
        setSelectingImage(false);
        return;
      }
      const asset: Asset | undefined = result.assets && result.assets[0];
      const uri = asset?.uri || '';
      if (uri) {
        setLocalPhoto(uri);
        setValue('photoProfile', uri, { shouldDirty: true });
      }
    } catch (e) {
      console.log('Erro ao selecionar imagem:', e);
    } finally {
      setSelectingImage(false);
    }
  }, [pickerOptions, setValue]);

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      if (profile?.id) {
        navigation.navigate('ProfileDetail', { id: profile.id });
      }
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROFILE.GET_PROFILE],
      });
    },
    onError: (error: unknown) => {
      console.log('Erro ao atualizar perfil', error);
    },
  });

  const onSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        const isLocalUri =
          typeof data.photoProfile === 'string' &&
          (data.photoProfile.startsWith('file:') || data.photoProfile.startsWith('content:'));

        let photoUrl = profile?.photoProfile || '';

        if (isLocalUri) {
          photoUrl = await uploadImages(data.photoProfile);
        } else if (data.photoProfile) {
          photoUrl = data.photoProfile;
        }

        const payload: ProfileFormData = {
          userName: data.userName,
          email: data.email,
          bioDescription: data.bioDescription,
          instagram: data.instagram,
          linkedin: data.linkedin,
          website: data.website,
          // mantém valores antigos para campos que não são editados nesta tela
          twitter: data.twitter || profile?.twitter || '',
          whatsapp: data.whatsapp || profile?.whatsapp || '',
          photoProfile: photoUrl,
        };

        updateProfileMutation(payload);
      } catch (e) {
        console.log('Erro no submit do perfil:', e);
      }
    },
    [profile, updateProfileMutation]
  );

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
          {/* Header Card */}
          <View style={styles.headerCard}>
            <View style={styles.headerRow}>
              <Avatar username={avatarUsername} size={avatarSize} photoProfile={avatarPhoto} />
              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={handlePickImage}
                disabled={selectingImage || isPending}
              >
                <Text style={styles.changePhotoText}>
                  {selectingImage ? 'Abrindo galeria...' : 'Alterar foto'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Informações */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Informações</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Nome de usuário</Text>
              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome de usuário"
                    placeholderTextColor="#777"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={30}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Seu Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    placeholderTextColor="#777"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Biografia</Text>
              <Controller
                control={control}
                name="bioDescription"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.multiline]}
                    placeholder="Digite sua biografia"
                    placeholderTextColor="#777"
                    keyboardType="default"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>
          </View>

          {/* Links */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Links</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Instagram</Text>
              <Controller
                control={control}
                name="instagram"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="@seuusuario"
                    placeholderTextColor="#777"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>LinkedIn</Text>
              <Controller
                control={control}
                name="linkedin"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="link do seu perfil"
                    placeholderTextColor="#777"
                    keyboardType="url"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Website</Text>
              <Controller
                control={control}
                name="website"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="https://seusite.com"
                    placeholderTextColor="#777"
                    keyboardType="url"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>
          </View>

          <CommonButton
            text="Salvar"
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            loading={isPending}
          />

          <View style={{ height: 20 }} />
        </ScrollView>

      </KeyboardAvoidingView>
</>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#121212',
  },

  // Cards
  headerCard: {
    width: '92%',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  card: {
    width: '92%',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },

  // Header content
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  changePhotoButton: {
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#222',
    backgroundColor: '#0A0A0A',
  },
  changePhotoText: {
    color: '#6A5ACD',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Fields
  field: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: 5,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#222',
    padding: 10,
    borderRadius: 5,
    color: '#FFF',
  },
  multiline: {
    minHeight: 120,
  },
});

export default Profile;