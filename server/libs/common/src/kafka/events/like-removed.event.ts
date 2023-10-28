import { KafkaMessage } from 'kafkajs';

import { ConsumerEvent, ProducerEvent, Topic } from './base';

export interface PLikeRemovedEvent extends ProducerEvent {
  topic: Topic.LikeRemoved;
  message: {
    value: {
      postId: string;
      userId: string;
    };
  };
}

export interface CLikeRemovedEvent extends ConsumerEvent {
  topic: Topic.LikeRemoved;
  message: Omit<KafkaMessage, 'value'> & {
    value: {
      postId: string;
      userId: string;
    };
  };
}
