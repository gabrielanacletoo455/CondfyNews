import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/routes/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QUERY_KEYS from '@/config/QUERY_KEYS';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteCommentary,
  deleteMyPost,
  getPostById,
  updateMyPost,
} from './services';
import { Posts } from '../home/services/types';
import { getTimeAgo, getReadingTime } from '@/utils/timeUtils';
import { CommonButton, RowContainer } from '@/components';
import { useEffect, useMemo, useState } from 'react';
import ModalComment from './components';
import { useAuth } from '@/contexts/AuthContext';
import styles from './styles';
import useNavigationCustom from '@/hooks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserProfile } from '../profile/types';
import { getProfile } from '../profile/services';
import Loading from '@/components/Loading';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface EditForm {
  title: string;
  content: string;
}
const Post = () => {
  const [commentShow, setShowComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigationCustom();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const { control, handleSubmit, reset } = useForm<EditForm>();


  const route =
    useRoute<NativeStackScreenProps<RootStackParamList, 'Post'>['route']>();
  const { id } = route.params;

  // Queries
  const { data: post, isLoading: isPostLoading } = useQuery<Posts>({
    queryKey: [QUERY_KEYS.POSTS.GET_POST_BY_ID, id],
    queryFn: () => getPostById(id),
  });

  const { data: userProfileData } = useQuery<UserProfile>({
    queryKey: [QUERY_KEYS.PROFILE.GET_PROFILE],
    queryFn: () => getProfile(),
    enabled: isAuthenticated,
  });

  const isOwner = useMemo(() => {
    return userProfileData?.id && post?.author?.id && 
      userProfileData.id === post.author.id;
  }, [userProfileData, post]);
  
  // Mutations
  const { mutate: deleteComment, isPending: isDeletingComment } = useMutation({
    mutationFn: deleteCommentary,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POSTS.GET_POST_BY_ID, id],
      });
    },
    onError: (error: any) => {
      console.log('Erro ao deletar comentário', error);
    },
  });
  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: deleteMyPost,
    onSuccess: () => {
      navigation.navigate('Relevantes');
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POSTS.GET_POST_BY_ID, id],
      });
    },
  });

  const { mutate: updatePostMutation, isPending: isUpdatingPost } = useMutation(
    {
      mutationFn: (post: Posts) => updateMyPost(id, post),
      onSuccess: () => {
        setIsEditing(false);
        reset();
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS.GET_POST_BY_ID, id],
        });
      },
    },
  );

  useEffect(() => {
    if (post) {
      reset({ title: post.title || '', content: post.content || '' });
    }
  }, [post, reset]);

  const handleStartEdit = () => {
    if (post) {
      reset({ title: post.title || '', content: post.content || '' });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    reset({ title: post?.title || '', content: post?.content || '' });
    setIsEditing(false);
  };

  const handleDeletePost = () => {
    Alert.alert('Excluir post', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => deletePost(id) },
    ]);
  };

  const onSubmit = (data: EditForm) => {
    if (!post) return;
    const updated: Posts = {
      ...post,
      title: data.title,
      content: data.content,
    };
    updatePostMutation(updated);
  };



  if (isPostLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
  
        <RowContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileDetail', { id: post?.author?.id || 0 })
            }
          >
            <Text style={styles.authorHeader}> {post?.author?.userName ?? 'Autor'}</Text>
          </TouchableOpacity>

          <Text style={styles.timer}>
            {getReadingTime(post?.content || '')} &nbsp;-&nbsp;
            {getTimeAgo(post?.createdAt || '')}
          </Text>

          {userProfileData?.id === post?.author?.id && (
            <View style={styles.rowItens}>
              <TouchableOpacity onPress={handleStartEdit} disabled={isUpdatingPost}>
                <MaterialIcons name="edit" size={24} color="#6A5ACD" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeletePost} disabled={isDeletingPost}>
                <MaterialIcons name="delete" size={24} color="#6A5ACD" />
              </TouchableOpacity>
            </View>
          )}
        </RowContainer>

        {/* ✅ Adicionar interface de edição aqui */}
        {isEditing && (
          <View style={styles.editContainer}>
            <Text style={styles.editTitle}>Editar Post</Text>
            
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Título</Text>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.editInput}
                    placeholder="Digite o título do post"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholderTextColor="#888888"
                    maxLength={60}
                  />
                )}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Conteúdo</Text>
              <Controller
                control={control}
                name="content"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.editInput, styles.multilineInput]}
                    placeholder="Digite o conteúdo do post"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholderTextColor="#888888"
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    maxLength={2000}
                  />
                )}
              />
            </View>

            <View style={styles.editButtonsContainer}>
              <CommonButton
                text="Salvar"
                onPress={handleSubmit(onSubmit)}
                disabled={isUpdatingPost}
                loading={isUpdatingPost}
              />
              <CommonButton
                text="Cancelar"
                onPress={handleCancelEdit}
                disabled={isUpdatingPost}
          
              />
            </View>
          </View>
        )}

        {/* ✅ Renderizar conteúdo normal quando não estiver editando */}
        {!isEditing && (
          <>
            <Text style={styles.title}>{post?.title}</Text>
            <Text
              style={styles.content}
              selectionColor="#6A5ACD"
              textBreakStrategy="highQuality"
              selectable={true}
            >
              {post?.content}
            </Text>
          </>
        )}

        {post?.imageUrl && (
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.postImage}
            resizeMode="contain"
          />
        )}

        {/* ✅ Seção de comentários */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>
            Comentários ({post?.comments?.length || 0})
          </Text>

          {post?.comments?.map(comment => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <TouchableOpacity
                  onPress={() =>
                    comment.author?.id &&
                    navigation.navigate('ProfileDetail', {
                      id: comment.author.id,
                    })
                  }
                >
                  <Text style={styles.commentAuthor}>
                    {comment.author?.userName ?? 'Usuário'}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.commentDate}>
                  {getTimeAgo(comment.createdAt)}
                </Text>

                {userProfileData?.id === comment.author?.id && (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        deleteComment(comment.id);
                      }}
                      disabled={isDeletingComment}
                    >
                      <MaterialIcons name="delete" size={24} color="#6A5ACD" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        deleteComment(comment.id);
                      }}
                      disabled={isDeletingComment}
                    >
                      <MaterialIcons name="edit" size={24} color="#6A5ACD" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <Text
                style={styles.commentText}
                selectionColor="#6A5ACD"
                textBreakStrategy="highQuality"
                selectable={true}
              >
                {comment.content}
              </Text>
            </View>
          ))}

          {post?.comments?.length === 0 && (
            <Text style={styles.noComments}>
              Nenhum comentário ainda. Seja o primeiro!
            </Text>
          )}
        </View>

        {!commentShow ? (
          <View style={styles.containerComment}>
            <CommonButton
              text="Responder"
              disabled={!isAuthenticated}
              onPress={() => setShowComment(!commentShow)}
            />
          </View>
        ) : (
          <ModalComment
            visible={commentShow}
            onClose={() => {
              setShowComment(!commentShow);
            }}
            postId={id}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Post;
