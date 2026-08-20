import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, PostDetailDto, PostListItemDto } from './post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostDetailDto> {
    const newPost = this.postsRepository.create(createPostDto);
    return this.toDetail(await this.postsRepository.save(newPost));
  }

  async findAll(): Promise<PostListItemDto[]> {
    // content не потрапляє в SELECT — важкий текст не читається з БД
    const posts = await this.postsRepository.find({
      select: [
        'id',
        'category_id',
        'title',
        'preview_img',
        'excerpt',
        'author',
        'createdAt',
      ],
      order: { createdAt: 'DESC' },
    });
    return posts.map((post) => ({
      id: post.id,
      category_id: post.category_id,
      title: post.title,
      preview_img: post.preview_img,
      excerpt: post.excerpt,
      author: post.author,
      createdAt: post.createdAt,
    }));
  }

  async findOne(id: number): Promise<PostDetailDto> {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Пост з id ${id} не знайдено`);
    }
    return this.toDetail(post);
  }

  private toDetail(post: PostEntity): PostDetailDto {
    return {
      id: post.id,
      category_id: post.category_id,
      title: post.title,
      main_img: post.main_img,
      content: post.content,
      author: post.author,
      createdAt: post.createdAt,
    };
  }
}
