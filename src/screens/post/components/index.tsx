import { CancelSaveButtons } from '@/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Modal as RNModal, TextInput, StyleSheet, View } from 'react-native';
import { createComment } from '../services';
import QUERY_KEYS from '@/config/QUERY_KEYS';

export interface ModalCommentProps {
  visible: boolean;
  onClose: () => void;
  postId: number;
}

export interface Comment {
  content: string;
  postId: number;
}

const ModalComment = ({ visible, onClose, postId }: ModalCommentProps) => {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const { mutate: createCommentMutation, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setComment('');
      onClose();

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POSTS.GET_POST_BY_ID, postId],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS.GET_POSTS] });
    },
    onError: (error: any) => {
      console.log('Erro ao criar comentário', error);
    },
  });

  const onSubmit = () => {
    const dataWithPostId = {
      content: comment,
      postId,
    };
    createCommentMutation(dataWithPostId);
  };

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onClose()}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TextInput
            placeholder="Digite seu comentário"
            multiline
            textAlignVertical="top"
            style={styles.textInput}
            placeholderTextColor="#FFF"
            maxLength={100}
            value={comment}
            onChangeText={setComment}
          />
          <CancelSaveButtons
            cancelButton="Cancelar"
            saveButton="Responder"
            isLoading={isPending}
            onCancel={() => onClose()}
            onSave={() => onSubmit()}
          />
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#252525',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    maxWidth: 400,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#FFF',
  },
});

export default ModalComment;
