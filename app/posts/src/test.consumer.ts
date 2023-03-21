import { ConsumerService } from '@ms-social-media/common';
import { Topic } from '@ms-social-media/common/dist/kafka/interfaces';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService<{ topic: Topic.Test }>,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topics: [Topic.Test] },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        console.log(JSON.parse(message.value.toString()));
        // throw new Error('Test error!');
      },
    });
  }
}
