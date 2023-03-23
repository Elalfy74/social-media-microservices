import { PrismaService } from '@ms-social-media/common';
import { Injectable } from '@nestjs/common';

import { CreateLikeDto } from './dtos';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  create(createLikeDto: CreateLikeDto, userId: string) {
    return this.prisma.like.create({
      data: {
        ...createLikeDto,
        userId,
      },
    });
  }

  // findAll() {
  //   return `This action returns all likes`;
  // }

  remove(postId: string, userId: string) {
    return this.prisma.like.delete({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });
  }
}
