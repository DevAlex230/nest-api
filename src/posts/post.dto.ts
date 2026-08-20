import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsOptional()
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

  // Короткий опис для списку — автор пише його окремо від content
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

export class PostListItemDto {
  id: number;
  category_id?: number;
  title: string;
  preview_img?: string;
  excerpt: string;
  author: string;
  createdAt: Date;
}

export class PostDetailDto {
  id: number;
  category_id?: number;
  title: string;
  main_img?: string;
  content: string;
  author: string;
  createdAt: Date;
}
