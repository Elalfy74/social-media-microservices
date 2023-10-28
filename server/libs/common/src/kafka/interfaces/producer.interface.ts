import type { Message } from 'kafkajs';

export interface IProducer {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  produce(message: Message): Promise<void>;
}
