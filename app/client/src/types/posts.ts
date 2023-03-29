export interface CreatePostInput {
  title: string;
}

export interface Post {
  id: string;
  title: string;
  imageUrl: string;
  username: string;
  createdAt: Date;
  commentsCount: number;
  likesCount: number;
  userHasLiked: boolean;
}
