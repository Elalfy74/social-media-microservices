import { ConsumerService, Topic } from '@ms-social-media/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService<{
      topic: Topic.PostCreated;
    }>,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topics: [Topic.PostCreated] },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        // console.log(typeof message);

        console.log(
          'Message received At CustomConsumer',
          // JSON.parse(message.value.toString()).postId,
        );
        // throw new Error('Test error!');
      },
    });
  }
}
