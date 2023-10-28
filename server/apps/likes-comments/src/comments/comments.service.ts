import { LikesCommentsPrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

import { CreateCommentDto, FindCommentsDto } from './dtos';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: LikesCommentsPrismaService) {}

  async create(dto: CreateCommentDto, userId: string) {
    return this.prisma.comment.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  find(dto: FindCommentsDto) {
    return this.prisma.comment.findMany({
      where: dto,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
