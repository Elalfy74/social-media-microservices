import { CurrentUser } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: JwtStrategy.cookieExtractor,

      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: CurrentUser) {
    return {
      id: payload.id,
      username: payload.username,
    };
  }

  private static cookieExtractor(req: Request) {
    let jwt: string | null = null;
    if (req.cookies) jwt = req.cookies['jwt'];
    return jwt;
  }
}
