import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Список дозволених origin'ів через кому в CORS_ORIGINS.
  // Якщо змінна не задана — дозволяємо лише локальний app-front-blog.
  const corsOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:4200')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({ origin: corsOrigins });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // відкидає поля, яких немає в DTO
      forbidNonWhitelisted: true, // і повертає 400, якщо такі поля прийшли
      transform: true,
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
