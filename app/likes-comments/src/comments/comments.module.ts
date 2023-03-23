import { KafkaModule } from '@ms-social-media/common';
import { Module } from '@nestjs/common';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [KafkaModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
