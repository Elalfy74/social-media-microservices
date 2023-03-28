import { axios } from '@/lib';
import { AuthInput, CurrentUser } from '@/types';

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
