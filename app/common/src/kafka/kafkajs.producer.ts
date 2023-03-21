import { Logger } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';

import { IProducer } from './interfaces/producer.interface';

export class KafkajsProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(private readonly topic: string) {
    this.kafka = new Kafka({
      brokers: ['localhost:29092'],
    });
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic);
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
