import { LikesCommentsPrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

import { CreateLikeDto, RemoveLikeDto } from './dtos';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: LikesCommentsPrismaService) {}

  async create(dto: CreateLikeDto, userId: string) {
    return this.prisma.like.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async remove(dto: RemoveLikeDto, userId: string) {
    return this.prisma.like.delete({
      where: {
        userId_postId: {
          ...dto,
          userId,
        },
      },
    });
  }
}
