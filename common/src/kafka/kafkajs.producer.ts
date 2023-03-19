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
    console.log(this.topic, message);
    await this.producer.send({ topic: this.topic, messages: [message] });
  }

  async connect() {
    try {
      console.log('Trying CONNECTED');

      await this.producer.connect();
      console.log('CONNECTED');
    } catch (err) {
      this.logger.error('Failed to connect to Kafka.', err);
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}
