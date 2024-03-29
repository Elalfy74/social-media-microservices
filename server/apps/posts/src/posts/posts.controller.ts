import { CurrentUser, GetUser, ImageSize, JwtGuard, Serialize } from '@app/common';
import {
  Body,
  Controller,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreatePostDto,
    @GetUser() user: CurrentUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new ImageSize()],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    const post = await this.postsService.create(dto, file, user.username);

    this.postsProducer.productCreatedEvent(post);

    return post;
  }

  @Get()
  @Serialize(PostDto)
  find(@GetUser() user?: CurrentUser) {
    return this.postsService.find(user?.id);
  }
}
