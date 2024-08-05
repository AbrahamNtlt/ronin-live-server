import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Logger } from '@nestjs/common';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  app.setGlobalPrefix('api/');
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()));
  app.enableCors();
  //
  app.useStaticAssets(join(__dirname, '../public', '/'), {
    prefix: '/static',
    setHeaders: (res) => {
      res.set('Cache-Control', 'max-age=2592000');
    },
  });
  await app.listen(8080);
}

bootstrap();
