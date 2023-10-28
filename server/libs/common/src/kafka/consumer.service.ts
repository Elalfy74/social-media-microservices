import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ConsumerConfig } from 'kafkajs';

import type { ConsumerEvent } from './events';
import type { IConsumer } from './interfaces';
import { KafkajsConsumer } from './kafkajs.consumer';

interface KafkajsConsumerOptions<T extends ConsumerEvent> {
  topic: T['topic'];
  config: ConsumerConfig;
  onMessage: (message: T['message']) => Promise<void>;
}

@Injectable()
export class ConsumerService<T extends ConsumerEvent>
  implements OnApplicationShutdown
{
  constructor(private configService: ConfigService) {}

  private readonly consumers: IConsumer[] = [];

  async consume({ topic, config, onMessage }: KafkajsConsumerOptions<T>) {
    const consumer = new KafkajsConsumer(
      topic,
      config,
      this.configService.get<string>('BROKER_URL')!,
    );

    await consumer.connect();

    await consumer.consume(onMessage);

    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
