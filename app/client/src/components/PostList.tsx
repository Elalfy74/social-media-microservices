import { Stack } from '@mantine/core';
import { PostItem } from './PostItem';

export const PostList = () => {
  return (
    <Stack spacing="lg" align="center">
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
      <PostItem />
    </Stack>
  );
};
