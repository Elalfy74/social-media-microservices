import { KafkaModule, PostsPrismaService, PrismaModule, validationSchema } from '@app/common';
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
      envFilePath: './apps/posts/.env',
    }),
    JwtModule.register({
      global: true,
    }),
    PrismaModule.forRoot(PostsPrismaService),
    KafkaModule,
    PostsModule,
    LikesModule,
    CommentsModule,
  ],
})
export class AppModule {}
