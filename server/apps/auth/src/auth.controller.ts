import { GetUser, JwtGuard, Serialize } from '@app/common';
import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthResGenerator } from './auth-res-generator';
import { AuthDto, UserDto } from './dtos';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const tokenAndUser = await this.authService.signup(dto);

    return AuthResGenerator.generateAuthResponse(tokenAndUser, res);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const tokenAndUser = await this.authService.login(dto);

    return AuthResGenerator.generateAuthResponse(tokenAndUser, res);
  }

  @Get('current-user')
  @UseGuards(JwtGuard)
  getCurrentUser(@GetUser() user: UserDto) {
    return user;
  }

  // @Post('signout')
  // @HttpCode(200)
  // signout(@Session() session: ISession) {
  //   session.userId = null;
  //   session.username = null;
  // }
}
