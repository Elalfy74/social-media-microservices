import { KafkaMessage } from 'kafkajs';
import { ConsumerEvent, ProducerEvent, Topic } from './base';

export interface PPostCreatedEvent extends ProducerEvent {
  topic: Topic.PostCreated;
  message: {
    value: {
      postId: string;
    };
  };
}

export interface CPostCreatedEvent extends ConsumerEvent {
  topic: Topic.PostCreated;
  message: Omit<KafkaMessage, 'value'> & {
    value: {
      postId: string;
    };
  };
}
