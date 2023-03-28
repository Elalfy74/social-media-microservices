import { axios } from '@/lib';
import { CreatePostInput, Post } from '@/types';

export const createPost = async (createPostInput: CreatePostInput) => {
  const post = await axios.post('/posts', createPostInput);
  return post.data;
};

export const getAllPost = async () => {
  const posts = await axios.get<Post[]>('/posts');
  return posts.data;
};
