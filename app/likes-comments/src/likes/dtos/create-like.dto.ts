import { IsUUID } from 'class-validator';

export class CreateLikeDto {
  @IsUUID(undefined, {
    message: 'Invalid postId',
  })
  postId: string;
}
