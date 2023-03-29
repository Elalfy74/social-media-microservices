import { Center, Loader, Stack, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getAllPost } from '@/services/posts';
import { PostItem } from './PostItem';

export const PostList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPost,
  });

  if (isError) return <Title>Something Went Wrong</Title>;

  if (isLoading) {
    return (
      <Center mt={20}>
        <Loader />
      </Center>
    );
  }

  if (data.length === 0) return <Title>No posts yet!</Title>;

  return (
    <Stack spacing="lg" align="center">
      {data.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Stack>
  );
};
