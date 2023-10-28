import { Module } from '@nestjs/common';

import { LikesController } from './likes.controller';
import { LikesProducer } from './likes.producer';
import { LikesService } from './likes.service';

@Module({
  imports: [],
  controllers: [LikesController],
  providers: [LikesService, LikesProducer],
})
export class LikesModule {}
