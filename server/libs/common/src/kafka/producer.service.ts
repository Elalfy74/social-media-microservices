import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { ProducerEvent } from './events';
import type { IProducer } from './interfaces';
import { KafkajsProducer } from './kafkajs.producer';

@Injectable()
export class ProducerService<T extends ProducerEvent>
  implements OnApplicationShutdown
{
  constructor(private readonly configService: ConfigService) {}

  private readonly producers = new Map<string, IProducer>();

  async produce(topic: T['topic'], message: T['message']) {
    const producer = await this.getProducer(topic);

    await producer.produce({
      ...message,
      value: JSON.stringify(message.value),
    });
  }

  private async getProducer(topic: string) {
    let producer = this.producers.get(topic);

    if (!producer) {
      producer = new KafkajsProducer(
        topic,
        this.configService.get<string>('BROKER_URL')!,
      );

      await producer.connect();

      this.producers.set(topic, producer);
    }
    return producer;
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }
}
