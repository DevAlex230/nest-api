import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Беремо порт з системних змінних Railway
  const port = process.env.PORT || 5000;

  // КРИТИЧНО: додай '0.0.0.0' другим аргументом
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on port: ${port}`);
}
bootstrap();
