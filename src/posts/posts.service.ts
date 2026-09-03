import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePostDto,
  PostDetailDto,
  PostListItemDto,
  PostsQueryDto,
} from './post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { CategoryEntity } from './category.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostDetailDto> {
    let category: CategoryEntity | null = null;
    if (createPostDto.category_id !== undefined) {
      category = await this.categoriesRepository.findOne({
        where: { id: createPostDto.category_id },
        select: { id: true, name: true, slug: true },
      });
      if (!category) {
        throw new BadRequestException(
          `Категорії з id ${createPostDto.category_id} не існує`,
        );
      }
    }
    const newPost = this.postsRepository.create(createPostDto);
    const saved = await this.postsRepository.save(newPost);
    saved.category = category;
    return this.toDetail(saved);
  }

  async findAll(query: PostsQueryDto): Promise<PostListItemDto[]> {

    const where: FindOptionsWhere<PostEntity> = {};
    if (query.category_id !== undefined) {
      where.category_id = query.category_id;
    }
    if (query.category) {
      where.category = { slug: query.category };
    }
    const posts = await this.postsRepository.find({
      select: {
        id: true,
        category_id: true,
        title: true,
        preview_img: true,
        excerpt: true,
        author: true,
        createdAt: true,
        category: { id: true, name: true, slug: true },
      },
      relations: { category: true },
      where,
      order: { createdAt: 'DESC' },
    });
    return posts.map((post) => ({
      id: post.id,
      category_id: post.category_id,
      category: post.category ?? null,
      title: post.title,
      preview_img: post.preview_img,
      excerpt: post.excerpt,
      author: post.author,
      createdAt: post.createdAt,
    }));
  }

  async findOne(id: number): Promise<PostDetailDto> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!post) {
      throw new NotFoundException(`Пост з id ${id} не знайдено`);
    }
    return this.toDetail(post);
  }

  private toDetail(post: PostEntity): PostDetailDto {
    return {
      id: post.id,
      category_id: post.category_id,
      category: post.category ?? null,
      title: post.title,
      main_img: post.main_img,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
    };
  }
}
