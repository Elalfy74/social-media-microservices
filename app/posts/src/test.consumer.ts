import {
  ConsumerService,
  CPostCreatedEvent,
  Topic,
} from '@ms-social-media/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService<CPostCreatedEvent>,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topics: [Topic.PostCreated] },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        // console.log(typeof message);

        console.log(
          'Message received At CustomConsumer' + message.value.postId,
          // JSON.parse(message.value.toString()).postId,
        );
        // throw new Error('Test error!');
      },
    });
  }
}
