import { KafkaModule } from '@ms-social-media/common';
import { Module } from '@nestjs/common';

import { TestConsumer } from '@/test.consumer';

import { AppController } from './posts.controller';
import { PostsService } from './posts.service';
import { S3Service } from './s3.service';

@Module({
  // imports: [KafkaModule],
  controllers: [AppController],
  providers: [PostsService, S3Service],
})
export class PostsModule {}
