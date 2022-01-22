import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(environment.server.globalPrefix);

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors(
    {
      origin: environment.server.cors.origin,
      credentials: true
    }
  );

  await app.listen(environment.server.port, environment.server.hostname);
  Logger.log(
    `🚀 Application is running on: http://localhost:${environment.server.port}/${environment.server.globalPrefix}`
  );
}

bootstrap().catch((error) => console.error('Server runs with error: ', error));
