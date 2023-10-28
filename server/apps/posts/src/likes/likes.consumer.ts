import {
  type CLikeCreatedEvent,
  type CLikeRemovedEvent,
  ConsumerService,
  PostsPrismaService,
  Topic,
} from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class LikesConsumer implements OnModuleInit {
  constructor(
    private readonly prisma: PostsPrismaService,
    private readonly createdConsumer: ConsumerService<CLikeCreatedEvent>,
    private readonly removedConsumer: ConsumerService<CLikeRemovedEvent>,
  ) {}

  async onModuleInit() {
    this.createdConsumer.consume({
      topic: Topic.LikeCreated,
      config: { groupId: 'like-created-consumer' },
      onMessage: async (message) => {
        await this.prisma.like.create({
          data: message.value,
        });
      },
    });

    this.removedConsumer.consume({
      topic: Topic.LikeRemoved,
      config: { groupId: 'like-removed-consumer' },
      onMessage: async (message) => {
        await this.prisma.like.delete({
          where: {
            userId_postId: message.value,
          },
        });
      },
    });
  }
}
