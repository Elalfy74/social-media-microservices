import { LikesCommentsPrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

import { CreateCommentDto, FindCommentsDto } from './dtos';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: LikesCommentsPrismaService) {}

  async create(dto: CreateCommentDto, username: string) {
    return this.prisma.comment.create({
      data: {
        ...dto,
        username,
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
