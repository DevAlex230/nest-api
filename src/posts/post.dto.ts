import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from '@app/categories/category.dto';

export class CreatePostDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  preview_img?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  main_img?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  excerpt: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}

export class PostsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  category_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;
}

export class PostListItemDto {
  id: number;
  category_id?: number;
  // null — пост без категорії; фронт малює бейдж без другого запиту
  category: CategoryDto | null;
  title: string;
  preview_img?: string;
  excerpt: string;
  author: string;
  createdAt: Date;
}

export class PostDetailDto {
  id: number;
  category_id?: number;
  category: CategoryDto | null;
  title: string;
  main_img?: string;
  content: string;
  author: string;
  createdAt: Date;
}
