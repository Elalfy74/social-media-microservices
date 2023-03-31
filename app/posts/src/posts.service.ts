import {
  ISession,
  PPostCreatedEvent,
  PrismaService,
  ProducerService,
  Topic,
} from '@ms-social-media/common';
import { Injectable } from '@nestjs/common';

import { S3Service } from './aws';
import { CreatePostDto } from './dtos';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private producer: ProducerService<PPostCreatedEvent>,
    private s3Service: S3Service,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
    session: ISession,
  ) {
    console.log(file?.originalname);

    const url = await this.s3Service.addFileToBucket(file);

    console.log(url);

    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        ...session,
        imageUrl: url,
      },
    });

    this.producer.produce(Topic.PostCreated, {
      value: {
        postId: post.id,
      },
    });

    return post;
  }

  async find(session: ISession) {
    return this.prisma.post.findMany({
      include: {
        likes: {
          where: {
            userId: session.userId || undefined,
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
