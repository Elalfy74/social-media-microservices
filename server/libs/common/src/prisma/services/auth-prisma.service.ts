import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as AuthPrismaClient } from '@prisma-auth/client';

@Injectable()
export class AuthPrismaService extends AuthPrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
