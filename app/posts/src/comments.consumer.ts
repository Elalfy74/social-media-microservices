import {
  CCommentCreatedEvent,
  ConsumerService,
  PrismaService,
  Topic,
} from '@ms-social-media/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class CommentsConsumer implements OnModuleInit {
  constructor(
    private readonly createdConsumer: ConsumerService<CCommentCreatedEvent>,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.createdConsumer.consume({
      topic: { topics: [Topic.CommentCreated] },
      config: { groupId: 'comment-created-consumer' },
      onMessage: async (message) => {
        await this.prisma.post.update({
          where: {
            id: message.value.postId,
          },
          data: {
            commentsCount: {
              increment: 1,
            },
          },
        });

        console.log(
          'Message received At Comment Created Consumer' + message.value.postId,
        );
      },
    });
  }
}
