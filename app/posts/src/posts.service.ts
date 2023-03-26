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
    private readonly prisma: PrismaService,
    private producer: ProducerService<PPostCreatedEvent>, // private readonly s3Service: S3Service,
  ) {}
  // constructor(
  //   private readonly producerService: ProducerService<{
  //     topic: Topic.Test;
  //     message: {
  //       value: {
  //         name: string;
  //       };
  //     };
  //   }>,
  // ) {}

  async create(
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
    session: ISession,
  ) {
    // const url = await this.s3Service.addFileToBucket(file);

    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        ...session,
        imageUrl:
          'https://images.unsplash.com/photo-1679072644862-f0db0d92f4f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
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
    });
  }
}
