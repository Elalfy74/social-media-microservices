import { PostsPrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma-posts/client';

import { StorageService } from '../storage/storage.service';
import { CreatePostDto } from './dtos';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PostsPrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(
    dto: CreatePostDto,
    file: Express.Multer.File | undefined,
    username: string,
  ): Promise<Post> {
    if (!file) return this.prisma.post.create({ data: { ...dto, username, imageUrl: '' } });

    const imageUrl = await this.storageService.uploadFile(file);

    return this.prisma.post.create({
      data: {
        ...dto,
        imageUrl,
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
