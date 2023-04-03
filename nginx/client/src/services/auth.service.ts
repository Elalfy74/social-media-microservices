import { axios } from '@/lib';
import { type AuthInput, type CurrentUser } from '@/types/auth.types';

export const signup = async (signupInput: AuthInput) => {
  const res = await axios.post<CurrentUser>('/auth/signup', signupInput);
  return res.data;
};

export const login = async (loginInput: AuthInput) => {
  const res = await axios.post<CurrentUser>('/auth/login', loginInput);
  return res.data;
};

export const signout = async () => {
  await axios.post('/auth/signout');
};

export const checkAuth = async () => {
  return axios.get('/auth/checkauth');
};
