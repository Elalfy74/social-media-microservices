import { KafkaMessage, Message } from 'kafkajs';
import { Topic } from './topic';

export interface ProducerEvent {
  topic: Topic;
  message: Omit<Message, 'value'> & {
    value: any;
  };
}
export interface ConsumerEvent {
  topic: Topic;
  message: Omit<KafkaMessage, 'value'> & {
    value: any;
  };
}
