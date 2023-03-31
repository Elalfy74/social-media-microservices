import { ScrollArea, Stack } from '@mantine/core';
// eslint-disable-next-line import/no-cycle
import { PostItem } from './PostItem';
import { type Post } from '@/types/posts';
import { CommentList } from './Comments/CommentList';
import { CommentForm } from './Comments/CommentForm';

export const FullPostContent = ({ post }: { post: Post }) => {
  return (
    <Stack spacing="xl" py={5}>
      <ScrollArea h={700}>
        <PostItem post={post} />
        <CommentList postId={post.id} />
      </ScrollArea>
      <CommentForm postId={post.id} />
    </Stack>
  );
};
