import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto);
  }
}
