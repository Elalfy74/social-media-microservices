import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
import { ConfigService } from '@nestjs/config';

import { AuthModule } from './auth.module';

const logger = new Logger('bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
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

  const port = configService.get('PORT') || 3000;

  await app.listen(port);

  logger.log(`Auth Service is Running on Port ${port}!`);
}
bootstrap();
