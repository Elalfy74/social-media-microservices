import { CurrentUser, GetUser, JwtGuard } from '@app/common';
import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';

import { CreateLikeDto, RemoveLikeDto } from './dtos';
import { LikesProducer } from './likes.producer';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    private readonly likesProducer: LikesProducer,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() dto: CreateLikeDto, @GetUser() user: CurrentUser) {
    const like = await this.likesService.create(dto, user.id);

    this.likesProducer.produceCreatedEvent(like);

    return like;
  }

  @Delete(':postId')
  remove(@Param() dto: RemoveLikeDto, @GetUser() user: CurrentUser) {
    return this.likesService.remove(dto, user.id);
  }
}
