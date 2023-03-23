import {
  PLikeCreatedEvent,
  PLikeRemovedEvent,
  PrismaService,
  ProducerService,
  Topic,
} from '@ms-social-media/common';
import { Injectable } from '@nestjs/common';

import { CreateLikeDto } from './dtos';

@Injectable()
export class LikesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createdProducer: ProducerService<PLikeCreatedEvent>,
    private readonly removedProducer: ProducerService<PLikeRemovedEvent>,
  ) {}

  async create(createLikeDto: CreateLikeDto, userId: string) {
    const like = await this.prisma.like.create({
      data: {
        ...createLikeDto,
        userId,
      },
    });

    this.createdProducer.produce(Topic.LikeCreated, {
      value: {
        postId: like.postId,
        userId: like.userId,
      },
    });

    return like;
  }

  async remove(postId: string, userId: string) {
    const like = await this.prisma.like.delete({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });

    this.removedProducer.produce(Topic.LikeRemoved, {
      value: {
        postId: like.postId,
        userId: like.userId,
      },
    });
  }
}
