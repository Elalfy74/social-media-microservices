import { KafkaMessage } from 'kafkajs';

import { ConsumerEvent, ProducerEvent, Topic } from './base';

export interface PLikeCreatedEvent extends ProducerEvent {
  topic: Topic.LikeCreated;
  message: {
    value: {
      postId: string;
      userId: string;
    };
  };
}

export interface CLikeCreatedEvent extends ConsumerEvent {
  topic: Topic.LikeCreated;
  message: Omit<KafkaMessage, 'value'> & {
    value: {
      postId: string;
      userId: string;
    };
  };
}
