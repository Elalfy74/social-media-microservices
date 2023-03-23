import { KafkaModule, PrismaModule } from '@ms-social-media/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { TestConsumer } from '@/test.consumer';
import { S3Service } from './aws/s3.service';
import { CommentsConsumer } from './comments.consumer';
import { LikesConsumer } from './likes.consumer';
import { AppController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [PostsService, LikesConsumer, CommentsConsumer],
})
export class PostsModule {}
