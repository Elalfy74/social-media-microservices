import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const userId = request.session.userId;

    if (!userId) throw new UnauthorizedException();

    return userId;
  }
}
