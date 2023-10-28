import { PLikeCreatedEvent, PLikeRemovedEvent, ProducerService, Topic } from '@app/common';
import { Injectable } from '@nestjs/common';
import type { Like } from '@prisma-likes-comments/client';

@Injectable()
export class LikesProducer {
  constructor(
    private readonly createdProducer: ProducerService<PLikeCreatedEvent>,
    private readonly removedProducer: ProducerService<PLikeRemovedEvent>,
  ) {}

  produceCreatedEvent(like: Like) {
    this.createdProducer.produce(Topic.LikeCreated, {
      value: like,
    });
  }

  produceRemovedEvent(like: Like) {
    this.removedProducer.produce(Topic.LikeRemoved, {
      value: like,
    });
  }
}
