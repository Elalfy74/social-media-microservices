import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

import { AppModule } from './app.module';

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  const port = configService.get('PORT') || 3002;

  await app.listen(port);

  logger.log(`Likes-Comments Service is Running on Port ${port}!`);
}
bootstrap();
