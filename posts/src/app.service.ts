import { ProducerService } from '@ms-social-media/common';
import { Topic } from '@ms-social-media/common/dist/kafka/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly producerService: ProducerService<{
      topic: Topic.Test;
      message: {
        value: {
          name: string;
        };
      };
    }>,
  ) {}

  async getHello() {
    await this.producerService.produce(Topic.Test, {
      value: {
        name: 'Mahmoud',
      },
    });
    return 'Hello World!';
  }
}
