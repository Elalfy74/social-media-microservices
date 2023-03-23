import { KafkaMessage } from 'kafkajs';
import { ConsumerEvent, ProducerEvent, Topic } from './base';

export interface PCommentCreatedEvent extends ProducerEvent {
  topic: Topic.CommentCreated;
  message: {
    value: {
      postId: string;
    };
  };
}

export interface CCommentCreatedEvent extends ConsumerEvent {
  topic: Topic.CommentCreated;
  message: Omit<KafkaMessage, 'value'> & {
    value: {
      postId: string;
    };
  };
}
