import { ProducerService, Topic } from '@ms-social-media/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  //   constructor(
  //     private readonly producerService: ProducerService<{
  //       topic: Topic.Test;
  //       message: {
  //         value: {
  //           name: string;
  //         };
  //       };
  //     }>,
  //   ) {}

  create() {}

  // async getHello() {
  //   await this.producerService.produce(Topic.Test, {
  //     value: {
  //       name: 'Mahmoud',
  //     },
  //   });
  //   return 'Hello World!';
  // }
}
