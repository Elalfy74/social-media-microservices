import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { ConsumerEvent } from './events';

import { IConsumer } from './interfaces';

export class KafkajsConsumer<T extends ConsumerEvent> implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopics,
    config: ConsumerConfig
  ) {
    this.kafka = new Kafka({ brokers: ['localhost:29092'] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic.topics}-${config.groupId}`);
  }

  async consume(onMessage: (message: T['message']) => Promise<void>) {
    await this.consumer.subscribe(this.topic);

    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        try {
          const parsedValue = this.parseValue(message.value);

          await onMessage({
            ...message,
            value: parsedValue,
          });

          this.logger.log(
            `Successfully received message ${message.value.toString()}`
          );
        } catch (err) {
          this.logger.error(
            'Error consuming message. Adding to dead letter queue...',
            err
          );
          // await this.addMessageToDlq(message);
        }
      },
    });
  }

  // private async addMessageToDlq(message: KafkaMessage) {
  //   await this.databaseService
  //     .getDbHandle()
  //     .collection('dlq')
  //     .insertOne({ value: message.value, topic: this.topic.topic });
  // }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
      // await sleep(5000);
      // await this.connect();
    }
  }

  async disconnect() {
    await this.consumer.disconnect();
  }

  private parseValue(value: Buffer) {
    return JSON.parse(value.toString());
  }
}
