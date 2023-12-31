import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configSwagger } from './api-docs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  configSwagger(app);
  await app.listen(3000);
}
bootstrap();
