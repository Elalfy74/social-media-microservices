import { INestApplication, Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

export async function setup(app: INestApplication, title?: string) {
  const logger = new Logger('bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT')!;

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(title || `MS Social Media ${title} API`)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  return {
    port,
    logger,
  };
}
