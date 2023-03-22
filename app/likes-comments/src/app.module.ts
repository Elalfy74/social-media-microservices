import { PrismaModule } from '@ms-social-media/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommentsModule } from '@/comments/comments.module';
import { LikesModule } from '@/likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
