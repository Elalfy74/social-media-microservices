import { IsUUID } from 'class-validator';

export class FindCommentsDto {
  @IsUUID(undefined, {
    message: 'Invalid postId',
  })
  postId: string;
}
