import { setup } from '@app/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, logger } = await setup(app, 'Posts');

  logger.log(`Posts Service is Running on Port ${port}!`);
}
bootstrap();
