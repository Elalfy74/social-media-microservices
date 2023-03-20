import { Body, Controller, Get, HttpCode, Post, Session } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';

import { AuthService } from './auth.service';
import { AuthDto } from './dtos';
import { AuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Session() session: { userId: string }) {
    const savedUser = await this.authService.signup(dto);

    session.userId = savedUser.id;
    return savedUser;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto, @Session() session: { userId: string }) {
    const user = await this.authService.login(dto);

    session.userId = user.id;
    return user;
  }

  @Post('signout')
  @HttpCode(200)
  signout(@Session() session: { userId: string }) {
    session.userId = null;
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  getMe(@Session() session: { userId: string }) {
    return this.authService.whoami(session.userId);
  }
}