import {
  DocsController,
  KafkaModule,
  LikesCommentsPrismaService,
  PrismaModule,
  validationSchema,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: './apps/likes-comments/.env',
    }),
    JwtModule.register({
      global: true,
    }),
    PrismaModule.forRoot(LikesCommentsPrismaService),
    KafkaModule,
    PostsModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [DocsController],
})
export class AppModule {}
