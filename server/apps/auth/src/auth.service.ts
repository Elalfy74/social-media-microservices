import { AuthPrismaService } from '@app/common';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { AuthDto, UserDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private readonly JWT_SECRET: string = this.config.get('JWT_SECRET')!;

  async signup(dto: AuthDto) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (userExist) throw new BadRequestException('User Already Exist');

    dto.password = await hash(dto.password, 12);

    const user = await this.prisma.user.create({ data: dto });
    const jwt = this.signToken({ username: user.username, id: user.id });

    return {
      user,
      jwt,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({ where: { username: dto.username } });

    if (!user) throw new ForbiddenException('Invalid Username or Password!');

    // Check Password
    const isEqual = await compare(dto.password, user.password);
    if (!isEqual) throw new ForbiddenException('Invalid Email or Password');

    const jwt = this.signToken({ username: user.username, id: user.id });

    return {
      user,
      jwt,
    };
  }

  private signToken(payload: UserDto): string {
    return this.jwtService.sign(payload, { secret: this.JWT_SECRET });
  }
}
