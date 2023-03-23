import { AuthGuard, ISession } from '@ms-social-media/common';
import {
  Body,
  Controller,
  Delete,
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

  @Delete()
  @UseGuards(AuthGuard)
  remove(@Query() query: RemoveLikeDto, @Session() session: ISession) {
    return this.likesService.remove(query.postId, session.userId);
  }
}
