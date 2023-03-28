import { axios } from '@/lib';
import { CreateLikeInput, RemoveLikeInput } from '@/types';

export const createLike = (createLikeInput: CreateLikeInput) => {
  return axios.post('/likes', createLikeInput);
};

export const removeLike = (removeLikeInput: RemoveLikeInput) => {
  return axios.delete(`/likes/${removeLikeInput.postId}`);
};
