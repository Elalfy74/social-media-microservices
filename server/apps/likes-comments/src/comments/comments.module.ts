import { Module } from '@nestjs/common';

import { CommentsController } from './comments.controller';
import { CommentsProducer } from './comments.producer';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsProducer],
})
export class CommentsModule {}
