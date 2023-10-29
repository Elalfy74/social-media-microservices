import { Module } from '@nestjs/common';

import { StorageModule } from '../storage/storage.module';
import { PostsController } from './posts.controller';
import { PostsProducer } from './posts.producer';
import { PostsService } from './posts.service';

@Module({
  imports: [StorageModule],
  controllers: [PostsController],
  providers: [PostsService, PostsProducer],
})
export class PostsModule {}
