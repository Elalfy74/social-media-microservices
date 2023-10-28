import { Logger } from '@nestjs/common';
import { Consumer, ConsumerConfig, Kafka } from 'kafkajs';

import { IConsumer, OnMessage } from './interfaces';

export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: string,
    config: ConsumerConfig,
    brokerUrl: string,
  ) {
    this.kafka = new Kafka({ brokers: [brokerUrl] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`consumer-${topic}-${config.groupId}`);
  }

  async consume(onMessage: OnMessage): Promise<void> {
    await this.consumer.subscribe({
      topic: this.topic,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          try {
            const parsedValue = this.parseValue(message.value);

            onMessage({
              ...message,
              value: parsedValue,
            });

            this.logger.log(
              `Successfully received message ${message.value.toString()}`,
            );
          } catch (err) {
            this.logger.error('Error consuming message. ', err);
          }
        }
      },
    });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
    }
  }

  async disconnect() {
    this.consumer.disconnect();
  }

  private parseValue(value: Buffer) {
    return JSON.parse(value.toString());
  }
}
