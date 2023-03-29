import {
  PCommentCreatedEvent,
  PrismaService,
  ProducerService,
  Topic,
} from '@ms-social-media/common';
import { Injectable } from '@nestjs/common';

import { CreateCommentDto } from './dtos';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly producer: ProducerService<PCommentCreatedEvent>,
  ) {}

  async create(createCommentDto: CreateCommentDto, username: string) {
    const comment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        username,
      },
    });

    this.producer.produce(Topic.CommentCreated, {
      value: {
        postId: comment.postId,
      },
    });

    return comment;
  }

  find(postId: string) {
    return this.prisma.comment.findMany({
      where: {
        postId,
      },
    });
  }
}
