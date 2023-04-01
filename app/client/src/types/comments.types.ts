export interface CreateCommentInput {
  postId: string;
  body: string;
}

export interface GetCommentsInput {
  postId: string;
}

export interface Comment {
  id: string;
  username: string;
  postId: string;
  body: string;
  createdAt: Date;
}
