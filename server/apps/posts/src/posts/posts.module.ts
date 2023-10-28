import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import { PostsProducer } from './posts.producer';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, PostsProducer],
})
export class PostsModule {}
