import { CCommentCreatedEvent, ConsumerService, PostsPrismaService, Topic } from '@app/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class CommentsConsumer implements OnModuleInit {
  constructor(
    private readonly createdConsumer: ConsumerService<CCommentCreatedEvent>,
    private readonly prisma: PostsPrismaService,
  ) {}

  async onModuleInit() {
    await this.createdConsumer.consume({
      topic: Topic.CommentCreated,
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
      },
    });
  }
}
