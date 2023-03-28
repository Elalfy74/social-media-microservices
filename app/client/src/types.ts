export interface CurrentUser {
  id: string;
  username: string;
}

export interface AuthInput {
  username: string;
  password: string;
}

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

export interface CreateLikeInput {
  postId: string;
}
export interface RemoveLikeInput extends CreateLikeInput {}
