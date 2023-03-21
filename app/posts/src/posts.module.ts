import { KafkaModule, PrismaModule } from '@ms-social-media/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TestConsumer } from '@/test.consumer';

import { S3Service } from './aws/s3.service';
import { AppController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  // imports: [KafkaModule],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [PostsService],
})
export class PostsModule {}
