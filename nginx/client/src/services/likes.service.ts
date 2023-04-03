import { axios } from '@/lib';
import { type CreateLikeInput, type RemoveLikeInput } from '@/types/likes.types';

export const createLike = (createLikeInput: CreateLikeInput) => {
  return axios.post('/likes', createLikeInput);
};

export const removeLike = (removeLikeInput: RemoveLikeInput) => {
  return axios.delete(`/likes/${removeLikeInput.postId}`);
};
