import { KafkaModule, PrismaModule } from '@ms-social-media/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommentsModule } from '@/comments/comments.module';
import { LikesModule } from '@/likes/likes.module';
import { PostsConsumer } from '@/posts/posts.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
    PrismaModule,
    LikesModule,
    CommentsModule,
  ],
  providers: [PostsConsumer],
})
export class AppModule {}
