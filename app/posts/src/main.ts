import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PostsModule } from './posts.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(PostsModule);

  app.use(
    cookieSession({
      keys: ['random_string'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
