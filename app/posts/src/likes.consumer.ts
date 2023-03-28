import {
  CLikeCreatedEvent,
  CLikeRemovedEvent,
  ConsumerService,
  PrismaService,
  Topic,
} from '@ms-social-media/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class LikesConsumer implements OnModuleInit {
  constructor(
    private readonly createdConsumer: ConsumerService<CLikeCreatedEvent>,
    private readonly removedConsumer: ConsumerService<CLikeRemovedEvent>,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.createdConsumer.consume({
      topic: { topics: [Topic.LikeCreated] },
      config: { groupId: 'like-created-consumer' },
      onMessage: async (message) => {
        await this.prisma.like.create({
          data: {
            userId: message.value.userId,
            postId: message.value.postId,
          },
        });
      },
    });
    await this.removedConsumer.consume({
      topic: { topics: [Topic.LikeRemoved] },
      config: { groupId: 'like-removed-consumer' },
      onMessage: async (message) => {
        await this.prisma.like.delete({
          where: {
            userId_postId: {
              userId: message.value.userId,
              postId: message.value.postId,
            },
          },
        });
      },
    });
  }
}
