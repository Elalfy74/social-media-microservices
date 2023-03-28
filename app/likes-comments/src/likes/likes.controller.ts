import { AuthGuard, ISession } from '@ms-social-media/common';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';

import { CreateLikeDto, RemoveLikeDto } from './dtos';
import { LikesService } from './likes.service';

@Controller('/api/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createLikeDto: CreateLikeDto, @Session() session: ISession) {
    return this.likesService.create(createLikeDto, session.userId);
  }

  @Delete(':postId')
  @UseGuards(AuthGuard)
  remove(@Param() param: RemoveLikeDto, @Session() session: ISession) {
    return this.likesService.remove(param.postId, session.userId);
  }
}
