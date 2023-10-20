import {
  ConsumerService,
  CPostCreatedEvent,
  PrismaService,
  Topic,
} from '@ms-social-media/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PostsConsumer implements OnModuleInit {
  constructor(
    private readonly consumer: ConsumerService<CPostCreatedEvent>,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.consumer.consume({
      topic: { topics: [Topic.PostCreated] },
      config: { groupId: 'post-created' },
      onMessage: async (message) => {
        await this.prisma.post.create({
          data: {
            id: message.value.postId,
          },
        });
      },
    });
  }
}
