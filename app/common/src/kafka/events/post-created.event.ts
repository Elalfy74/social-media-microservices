import { ProducerEvent } from './base/base-event';
import { Topic } from './base/topic';

export interface PPostCreatedEvent extends ProducerEvent {
  topic: Topic.PostCreated;
  message: {
    value: {
      postId: string;
    };
  };
}
