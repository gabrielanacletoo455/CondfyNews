import api from '@/config/axios';
import { Comment } from '../components';
import { Posts } from '@/screens/home/services/types';

const getPostById = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

const createComment = async (comment: Comment) => {
  const response = await api.post(`/comments`, comment);
  return response.data;
};

const deleteCommentary = async (id: number) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};

const updateCommentary = async (id: number, comment: Comment) => {
  const response = await api.put(`/comments/${id}`, comment);
  return response.data;
};

const deleteMyPost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

const updateMyPost = async (id: number, post: Posts) => {
  const response = await api.patch(`/posts/${id}`, post);
  return response.data;
};

export {
  getPostById,
  createComment,
  deleteCommentary,
  updateCommentary,
  deleteMyPost,
  updateMyPost,
};
