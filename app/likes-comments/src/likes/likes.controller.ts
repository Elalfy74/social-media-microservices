import { ISession } from '@ms-social-media/common';
import { AuthGuard } from '@ms-social-media/common/dist/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';

import { CreateLikeDto } from './dtos';
import { LikesService } from './likes.service';

@Controller('/api/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createLikeDto: CreateLikeDto, @Session() session: ISession) {
    return this.likesService.create(createLikeDto, session.userId);
  }

  // @Get()
  // findAll() {
  //   return this.likesService.findAll();
  // }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  remove(@Param('postId') postId: string, @Session() session: ISession) {
    return this.likesService.remove(postId, session.userId);
  }
}
