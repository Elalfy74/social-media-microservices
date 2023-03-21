import { AuthGuard, ISession } from '@ms-social-media/common';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Session() session: ISession) {
    const savedUser = await this.authService.signup(dto);

    session.userId = savedUser.id;
    session.username = savedUser.username;

    return savedUser;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto, @Session() session: ISession) {
    const user = await this.authService.login(dto);

    session.userId = user.id;
    session.username = user.username;

    return user;
  }

  @Post('signout')
  @HttpCode(200)
  signout(@Session() session: ISession) {
    session.userId = null;
    session.username = null;
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  getMe(@Session() session: ISession) {
    // return this.authService.whoami(session.userId);
    return session;
  }
}
