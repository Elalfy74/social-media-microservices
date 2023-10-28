import { Module } from '@nestjs/common';

import { CommentsConsumer } from './comments.consumer';

@Module({
  providers: [CommentsConsumer],
})
export class CommentsModule {}
