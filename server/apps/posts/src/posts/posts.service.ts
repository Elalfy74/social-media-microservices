import { PostsPrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma-posts/client';

import { CreatePostDto } from './dtos';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PostsPrismaService) {}

  async create(dto: CreatePostDto, username: string): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...dto,
        imageUrl: 'dad',
        username,
      },
    });
  }

  async find(userId?: string) {
    return this.prisma.post.findMany({
      include: {
        likes: {
          where: {
            userId,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
