import { Module } from '@nestjs/common';

import { PostsConsumer } from './posts.consumer';

@Module({
  providers: [PostsConsumer],
})
export class PostsModule {}
