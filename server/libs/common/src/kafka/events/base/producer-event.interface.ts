import { Message } from 'kafkajs';

import type { Topic } from './topic';

export interface ProducerEvent {
  topic: Topic;
  message: Omit<Message, 'value'> & {
    value: any;
  };
}
