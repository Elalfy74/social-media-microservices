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

export const logout = async () => {
  await axios.post('/auth/logout');
};

export const getCurrentUser = async () => {
  return axios.get('/auth/current-user');
};
