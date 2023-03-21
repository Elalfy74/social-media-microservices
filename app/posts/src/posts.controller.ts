import { AuthGuard } from '@ms-social-media/common';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PostsService } from './posts.service';
import { S3Service } from './s3.service';

@Controller('posts')
export class AppController {
  constructor(
    private readonly postsService: PostsService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('img'))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    // console.log(body.title);
    // console.log(file);

    const url = await this.s3Service.addFileToBucket(file);

    console.log(url);
  }

  // @Get()
  // getHello() {
  //   return this.postsService.getHello();
  // }
}
