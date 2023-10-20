import { AuthGuard, ISession } from '@ms-social-media/common';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto, FindCommentsDto } from './dtos';

@Controller('/api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Session() session: ISession,
  ) {
    return this.commentsService.create(createCommentDto, session.username);
  }

  @Get(':postId')
  find(@Param() param: FindCommentsDto) {
    return this.commentsService.find(param.postId);
  }
}
