import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { PostsModule } from '@app/posts/posts.module';
import { CategoriesModule } from '@app/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Це дозволить бачити змінні всюди
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Railway підставить посилання самостійно
      autoLoadEntities: true, // Сама знайде файли .entity.ts
      // Автоматично створює/змінює таблиці. Зручно локально, але може дропнути
      // колонку з даними, тому вмикається лише явним DB_SYNCHRONIZE=true в .env.
      // На Railway ця змінна не задана — отже там synchronize вимкнено.
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      ssl: { rejectUnauthorized: false },
    }),
    PostsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
