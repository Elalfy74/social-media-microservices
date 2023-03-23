import { KafkaModule } from '@ms-social-media/common';
import { Module } from '@nestjs/common';

import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  imports: [KafkaModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
