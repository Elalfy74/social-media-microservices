import { Module } from '@nestjs/common';

import { LikesConsumer } from './likes.consumer';

@Module({
  imports: [],
  providers: [LikesConsumer],
})
export class LikesModule {}
