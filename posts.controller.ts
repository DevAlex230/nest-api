import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreatePostDto, PostDetailDto, PostListItemDto } from './post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll(): Promise<PostListItemDto[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PostDetailDto> {
    return this.postsService.findOne(id);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostDetailDto> {
    return this.postsService.createPost(createPostDto);
  }
}
