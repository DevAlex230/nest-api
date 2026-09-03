import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@app/posts/category.entity';
import { CategoryDto, CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoriesRepository.find({
      select: { id: true, name: true, slug: true },
      order: { name: 'ASC' },
    });
    return categories.map(({ id, name, slug }) => ({ id, name, slug }));
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    // name і slug — unique у БД. Перевіряємо заздалегідь, щоб замість
    // 500 від драйвера повернути зрозумілий 409 із назвою поля.
    const duplicate = await this.categoriesRepository.findOne({
      where: [
        { name: createCategoryDto.name },
        { slug: createCategoryDto.slug },
      ],
      select: { id: true, name: true, slug: true },
    });
    if (duplicate) {
      const field = duplicate.slug === createCategoryDto.slug ? 'slug' : 'name';
      throw new ConflictException(`Категорія з таким ${field} вже існує`);
    }

    const category = this.categoriesRepository.create(createCategoryDto);
    const { id, name, slug } = await this.categoriesRepository.save(category);
    return { id, name, slug };
  }
}
