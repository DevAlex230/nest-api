import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create(createPostDto);
    return await this.postsRepository.save(newPost);
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postsRepository.find();
  }
}
