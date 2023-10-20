import { Center, Loader, Stack, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getAllPost } from '@/services/posts.service';
import { PostItem } from './PostItem';

export const PostList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPost,
  });

  if (isError) {
    return (
      <Center>
        <Title>Something Went Wrong</Title>
      </Center>
    );
  }

  if (isLoading) {
    return (
      <Center mt={20}>
        <Loader />
      </Center>
    );
  }

  if (data.length === 0) {
    return (
      <Center>
        <Title>No posts yet!</Title>{' '}
      </Center>
    );
  }

  return (
    <Stack spacing="lg" align="center">
      {data.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Stack>
  );
};
