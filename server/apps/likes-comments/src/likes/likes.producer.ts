import { PLikeCreatedEvent, ProducerService, Topic } from '@app/common';
import { Injectable } from '@nestjs/common';
import type { Like } from '@prisma-likes-comments/client';

@Injectable()
export class LikesProducer {
  constructor(private readonly producer: ProducerService<PLikeCreatedEvent>) {}

  produceCreatedEvent(like: Like) {
    this.producer.produce(Topic.LikeCreated, {
      value: like,
    });
  }
}
