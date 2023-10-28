import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as LikesCommentsPrismaClient } from '@prisma-likes-comments/client';

@Injectable()
export class LikesCommentsPrismaService extends LikesCommentsPrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
