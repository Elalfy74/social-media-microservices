import { PCommentCreatedEvent, ProducerService, Topic } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma-likes-comments/client';

@Injectable()
export class CommentsProducer {
  constructor(private readonly producer: ProducerService<PCommentCreatedEvent>) {}

  producerCreatedEvent(comment: Comment) {
    this.producer.produce(Topic.CommentCreated, {
      value: {
        postId: comment.postId,
      },
    });
  }
}
