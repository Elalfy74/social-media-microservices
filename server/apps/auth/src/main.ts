import { setup } from '@app/common';
import { NestFactory } from '@nestjs/core';

import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const { port, logger } = await setup(app, 'Auth');

  logger.log(`Auth Service is Running on Port ${port}!`);
}
bootstrap();
