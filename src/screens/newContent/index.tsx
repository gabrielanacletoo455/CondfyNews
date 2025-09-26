import { CommonButton, Container, MainTitle } from '@/components';
import { useMutation } from '@tanstack/react-query';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { Content, createContent } from './services';
import useNavigationCustom from '@/hooks';
import { Controller, useForm } from 'react-hook-form';
import styles from './styles';
import { Alert } from 'react-native';
import { requestPhotosPermission } from '@/utils/permissions';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useState } from 'react';
import { uploadImages } from '@/utils';

export interface SelectedImage {
  uri: string;
  fileName?: string;
  type?: string;
  width?: number;
  height?: number;
  fileSize?: number;
}

const NewContent = () => {
  const navigation = useNavigationCustom();
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  
  // Form
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Content>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const { mutate: createContentMutation, isPending } = useMutation({
    mutationFn: createContent,
    onSuccess: () => {
      navigation.navigate('Index');
    },
  });

  const handlePickImage = async () => {
    const { granted } = await requestPhotosPermission();
    if (!granted) {
      Alert.alert('Permissão negada', 'Não foi possível acessar suas fotos.');
      return;
    }

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.9,
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert(
        'Erro ao abrir galeria',
        result.errorMessage ?? result.errorCode,
      );
      return;
    }

    const assets = result.assets as Asset[] | undefined;
    if (!assets || assets.length === 0) return;

    const a = assets[0];
    const image: SelectedImage = {
      uri: a.uri ?? '',
      fileName: a.fileName ?? undefined,
      type: a.type ?? undefined,
      width: a.width ?? undefined,
      height: a.height ?? undefined,
      fileSize: a.fileSize ?? undefined,
    };

    setSelectedImage(image);
  };

  const onSubmit = async (data: Content) => {
    try {
      let imageUrl: string | undefined

      setIsUploading(true);
      if (selectedImage) {
      // Passa a URI diretamente - a função uploadImages aceita string
      imageUrl = await uploadImages(selectedImage.uri);
    }
    const contentData = {
      ...data,
      ...(imageUrl && { imageUrl })
    };
    console.log(contentData);
    createContentMutation(contentData);

    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      Alert.alert('Erro', 'Não foi possível fazer upload da imagem');
    } finally {
      setIsUploading(false);
    }
    }
  

  const isLoading = isPending || isUploading;

  return (
    <Container>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <MainTitle title="Novo Conteúdo" />
        
        <Text style={styles.label}>Título</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Título"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholderTextColor="#FFF"
            />
          )}
        />
        
        <Text style={styles.label}>Conteúdo da publicação</Text>
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContent}>
              <TextInput
                style={styles.inputField}
                multiline={true}
                textAlignVertical="top"
                numberOfLines={4}
                placeholder="Conteúdo"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor="#FFF"
              />
              {selectedImage && (
                <View style={styles.inlineImageContainer}>
                  <Image
                    source={{ uri: selectedImage.uri }}
                    style={styles.inlineImage}
                    resizeMode="contain"
                    accessibilityLabel="Prévia da imagem selecionada"
                  />
                </View>
              )}
            </View>
          )}
        />

        <CommonButton
          text="Salvar"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending || !isValid}
          loading={isLoading}
        />

        <View>
          <CommonButton text="Selecionar imagem" onPress={handlePickImage} />
        </View>
      </ScrollView>
    </Container>
  );
};

export default NewContent;
