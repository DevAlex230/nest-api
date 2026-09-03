import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreatePostDto,
  PostDetailDto,
  PostListItemDto,
  PostsQueryDto,
} from './post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll(@Query() query: PostsQueryDto): Promise<PostListItemDto[]> {
    return this.postsService.findAll(query);
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
