import { KafkaMessage } from 'kafkajs';

import type { Topic } from './topic';

export interface ConsumerEvent {
  topic: Topic;
  message: Omit<KafkaMessage, 'value'> & {
    value: any;
  };
}
