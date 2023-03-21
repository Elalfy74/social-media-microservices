import { PrismaService } from '@ms-social-media/common';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

import { AuthDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (userExist) {
      throw new BadRequestException('User Already Exist');
    }

    dto.password = await hash(dto.password, 12);

    return await this.prisma.user.create({
      data: dto,
    });
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid Username or Password!');
    }

    // Check Password
    const isEqual = await compare(dto.password, user.password);
    if (!isEqual) throw new ForbiddenException('Invalid Email or Password');

    return user;
  }

  async whoami(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user.username;
  }
}
