import { AuthGuard, ISession, Serialize } from '@ms-social-media/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreatePostDto, PostResponse } from './dtos';
import { PostsService } from './posts.service';

@Controller('/api/posts')
export class AppController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @Session() session: ISession,
  ) {
    return this.postsService.create(createPostDto, file, session);
  }

  @Get()
  @Serialize(PostResponse)
  find(@Session() session: ISession) {
    return this.postsService.find(session);
  }
  // @Get()
  // getHello() {
  //   return this.postsService.getHello();
  // }
}
