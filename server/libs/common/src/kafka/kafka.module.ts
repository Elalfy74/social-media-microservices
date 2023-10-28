import { Global, Module } from '@nestjs/common';

import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';

@Global()
@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
