import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { CategoryEntity } from './category.entity';

@Module({
  // CategoryEntity — щоб PostsService міг перевірити існування категорії
  imports: [TypeOrmModule.forFeature([PostEntity, CategoryEntity])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
