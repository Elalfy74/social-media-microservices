import { ConsumerService } from '@ms-social-media/common';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topics: ['test'] },
      config: { groupId: 'test-consumer' },
      onMessage: async (message) => {
        console.log({
          value: message.value.toString(),
        });
        // throw new Error('Test error!');
      },
    });
  }
}
