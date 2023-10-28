import { CurrentUser, GetUser, JwtGuard, Serialize } from '@app/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CreatePostDto, PostDto } from './dtos';
import { PostsProducer } from './posts.producer';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsProducer: PostsProducer,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() dto: CreatePostDto, @GetUser() user: CurrentUser) {
    const post = await this.postsService.create(dto, user.username);

    this.postsProducer.productCreatedEvent(post);

    return post;
  }

  @Get()
  @Serialize(PostDto)
  find(@GetUser() user?: CurrentUser) {
    return this.postsService.find(user?.id);
  }
}
