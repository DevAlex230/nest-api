import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  // slug іде в URL (/posts?category=frontend), тому лише латиниця,
  // цифри та дефіс — інакше фронту доведеться його енкодити
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug має містити лише малі латинські літери, цифри та дефіс',
  })
  slug: string;
}

export class CategoryDto {
  id: number;
  name: string;
  slug: string;
}
