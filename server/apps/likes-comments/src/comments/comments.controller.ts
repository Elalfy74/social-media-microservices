import { CurrentUser, GetUser, JwtGuard } from '@app/common';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CommentsProducer } from './comments.producer';
import { CommentsService } from './comments.service';
import { CreateCommentDto, FindCommentsDto } from './dtos';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentsProducer: CommentsProducer,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() dto: CreateCommentDto, @GetUser() user: CurrentUser) {
    const comment = await this.commentsService.create(dto, user.id);

    this.commentsProducer.producerCreatedEvent(comment);

    return comment;
  }

  @Get(':postId')
  async find(@Param() param: FindCommentsDto) {
    return this.commentsService.find(param);
  }
}
