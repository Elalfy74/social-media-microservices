import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AxiosError } from 'axios';
import { AuthInput, CurrentUser } from '@/types/auth.types';
import * as authService from '@/services/auth.service';

interface AuthState {
  currentUser: CurrentUser | null;
  signup: (loginInput: AuthInput) => Promise<void>;
  login: (loginInput: AuthInput) => Promise<void>;
  signout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      currentUser: null,

      signup: async (signupInput: AuthInput) => {
        const currentUser = await authService.signup(signupInput);
        set({ currentUser });
      },

      login: async (loginInput: AuthInput) => {
        const currentUser = await authService.login(loginInput);
        set({ currentUser });
      },

      signout: async () => {
        await authService.signout();
        set({ currentUser: null });
      },

      checkAuth: async () => {
        try {
          await authService.checkAuth();
        } catch (e) {
          if (e instanceof AxiosError) {
            if (e.status === 401) {
              set({ currentUser: null });
            }
          }
        }
      },
    }),
    {
      name: 'currentUser',
    }
  )
);
