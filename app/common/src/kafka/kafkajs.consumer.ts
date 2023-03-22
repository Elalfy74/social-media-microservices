import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaMessage,
} from 'kafkajs';

import { IConsumer } from './interfaces';

export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopics,
    config: ConsumerConfig
  ) {
    this.kafka = new Kafka({ brokers: ['localhost:9092'] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic.topics}-${config.groupId}`);
  }

  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topic);

    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        try {
          await onMessage(message);
          this.logger.log(
            `Successfully received message ${JSON.parse(message.value)}`
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
}
