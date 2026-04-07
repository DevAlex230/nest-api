import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
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
      synchronize: true, // Автоматично створить таблиці в БД (ідеально для навчання)
      ssl: process.env.DATABASE_URL?.includes('railway.app')
        ? { rejectUnauthorized: false }
        : false,
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
