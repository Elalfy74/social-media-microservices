import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsUUID(undefined, {
    message: 'Invalid postId',
  })
  postId: string;

  @IsString()
  @MinLength(2)
  body: string;
}
