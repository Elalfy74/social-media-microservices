import { ProducerService } from '@ms-social-media/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async getHello() {
    await this.producerService.produce('test', {
      value: 'Hello World',
    });
    return 'Hello World!';
  }
}
