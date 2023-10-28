import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PostsPrismaClient } from '@prisma-posts/client';

@Injectable()
export class PostsPrismaService extends PostsPrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
