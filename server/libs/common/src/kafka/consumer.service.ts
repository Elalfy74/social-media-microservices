import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerConfig, ConsumerSubscribeTopics } from 'kafkajs';
import { ConsumerEvent } from './events';

import { IConsumer } from './interfaces';
import { KafkajsConsumer } from './kafkajs.consumer';

interface KafkajsConsumerOptions<T extends ConsumerEvent> {
  topic: Omit<ConsumerSubscribeTopics, 'topics'> & {
    topics: [T['topic']];
  };
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
    const consumer = new KafkajsConsumer<T>(
      topic,
      config,
      this.configService.get('BROKER_URL')
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
