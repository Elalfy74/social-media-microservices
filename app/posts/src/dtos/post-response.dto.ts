import { Expose, Transform } from 'class-transformer';

export class PostResponse {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  imageUrl: string;

  @Expose()
  username: string;

  @Expose()
  createdAt: Date;

  @Expose()
  commentsCount: number;

  @Expose({ name: '_count' })
  @Transform(({ value }) => value.likes)
  likesCount: {
    likes: number;
  };

  @Expose({ name: 'likes' })
  @Transform(({ value }) => value.length > 0)
  userHasLiked: boolean;
}
