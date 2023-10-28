import { Logger } from '@nestjs/common';
import { Kafka, type Message, Producer } from 'kafkajs';

import { IProducer } from './interfaces';

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: string,
    brokerUrl: string,
  ) {
    this.kafka = new Kafka({
      brokers: [brokerUrl],
    });
    this.producer = this.kafka.producer();
    this.logger = new Logger(`producer-${topic}`);
  }

  async produce(message: Message) {
    await this.producer.send({ topic: this.topic, messages: [message] });

    this.logger.log(`Message Published Successfully ${message.value}`);
  }

  async connect() {
    try {
      this.logger.log('Trying Connecting on Producer');

      await this.producer.connect();
      this.logger.log('CONNECTED on Producer');
    } catch (err) {
      this.logger.error('Failed to connect to Kafka on producer.', err);
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
