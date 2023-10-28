import {
  ConsumerService,
  type CPostCreatedEvent,
  LikesCommentsPrismaService,
  Topic,
} from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PostsConsumer implements OnModuleInit {
  constructor(
    private readonly prisma: LikesCommentsPrismaService,
    private readonly consumer: ConsumerService<CPostCreatedEvent>,
  ) {}

  async onModuleInit() {
    this.consumer.consume({
      topic: Topic.PostCreated,
      config: { groupId: 'post-created-consumer' },
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
