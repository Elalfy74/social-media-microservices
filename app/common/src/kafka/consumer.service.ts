import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerConfig, ConsumerSubscribeTopics, KafkaMessage } from 'kafkajs';
import { Topic } from './events';

import { IConsumer } from './interfaces';
import { KafkajsConsumer } from './kafkajs.consumer';

export interface ConsumerEvent {
  topic: Topic;
}

interface KafkajsConsumerOptions<T extends Topic> {
  topic: ConsumerSubscribeTopics & {
    topics: T[];
  };
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}

@Injectable()
export class ConsumerService<T extends ConsumerEvent>
  implements OnApplicationShutdown
{
  private readonly consumers: IConsumer[] = [];

  async consume({
    topic,
    config,
    onMessage,
  }: KafkajsConsumerOptions<T['topic']>) {
    const consumer = new KafkajsConsumer(topic, config);

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
