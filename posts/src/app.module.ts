import { KafkaModule } from '@ms-social-media/common';
import { Module } from '@nestjs/common';

import { TestConsumer } from '@/test.consumer';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
