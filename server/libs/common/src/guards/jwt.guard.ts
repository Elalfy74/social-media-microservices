import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.jwt;

    if (!jwt) throw new UnauthorizedException();

    try {
      const user = this.jwtService.verify(jwt, {
        secret: this.config.get('JWT_SECRET'),
      });

      context.switchToHttp().getRequest().user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
