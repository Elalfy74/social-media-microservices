import {
  ISession,
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
    private readonly prisma: PrismaService, // private readonly s3Service: S3Service,
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

    return this.prisma.post.create({
      data: {
        ...createPostDto,
        ...session,
        imageUrl:
          'https://images.unsplash.com/photo-1679072644862-f0db0d92f4f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
      },
    });
  }

  async find(session?: ISession) {
    return this.prisma.post.findMany({
      include: {
        likes: {
          where: {
            userId: session.userId,
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

  // async getHello() {
  //   await this.producerService.produce(Topic.Test, {
  //     value: {
  //       name: 'Mahmoud',
  //     },
  //   });
  //   return 'Hello World!';
  // }
}
