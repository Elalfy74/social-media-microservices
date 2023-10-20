import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { PostsModule } from './posts.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);
  const configService = app.get(ConfigService);

  app.use(
    cookieSession({
      keys: [configService.get('SESSION_KEY')],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const frontEndUrl: string = configService.get('FRONTEND_URL');

  app.enableCors({
    origin: [...frontEndUrl.split(' ')],
    credentials: true,
  });

  const port = configService.get('PORT') || 3001;

  await app.listen(port);

  logger.log(`Posts Service is Running on Port ${port}!`);
}
bootstrap();
