import type { User } from '@prisma-auth/client';
import type { CookieOptions, Response } from 'express';

import type { TokenAndUser } from './interfaces';

export class AuthResGenerator {
  private static readonly COOKIE_OPTIONS: CookieOptions = {
    secure: true,
    httpOnly: true,
    path: '/',
  };

  public static generateAuthResponse({ jwt, user }: TokenAndUser, res: Response): User {
    res.cookie('jwt', jwt, this.COOKIE_OPTIONS);

    return user;
  }

  public static generateLogoutResponse(res: Response): void {
    res.cookie('jwt', null, this.COOKIE_OPTIONS);
  }
}
