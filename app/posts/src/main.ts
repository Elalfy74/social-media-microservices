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

  await app.listen(3001);
}
bootstrap();