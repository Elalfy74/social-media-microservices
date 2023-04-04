import { axios } from '@/lib';
import { CreateCommentInput, GetCommentsInput, Comment } from '@/types/comments.types';

export const createComment = async (createCommentInput: CreateCommentInput) => {
  const comment = await axios.post<Comment>('/comments', createCommentInput);
  return comment.data;
};

export const getCommentsByPost = async (getCommentsInput: GetCommentsInput) => {
  const comments = await axios.get<Comment[]>(`/comments/${getCommentsInput.postId}`);
  return comments.data;
};
