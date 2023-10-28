import type { User } from '@prisma-auth/client';

export interface TokenAndUser {
  jwt: string;
  user: User;
}
