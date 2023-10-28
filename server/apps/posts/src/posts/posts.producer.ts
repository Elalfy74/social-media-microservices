import { PPostCreatedEvent, ProducerService, Topic } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma-posts/client';

@Injectable()
export class PostsProducer {
  constructor(private readonly postCreatedProducer: ProducerService<PPostCreatedEvent>) {}

  productCreatedEvent(post: Post) {
    this.postCreatedProducer.produce(Topic.PostCreated, {
      value: {
        postId: post.id,
      },
    });
  }
}
