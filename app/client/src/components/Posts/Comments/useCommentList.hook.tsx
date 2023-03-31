import { useQuery } from '@tanstack/react-query';
import { Center, Title, Loader } from '@mantine/core';
import { getCommentsByPost } from '@/services/comments';

export const useCommentList = (postId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`comments/${postId}`],
    queryFn: () => getCommentsByPost({ postId }),
  });

  let placeHolder;

  if (isError) {
    placeHolder = (
      <Center>
        <Title>Something Went Wrong</Title>
      </Center>
    );
  } else if (isLoading) {
    placeHolder = (
      <Center mt={20}>
        <Loader />
      </Center>
    );
  } else if (data.length === 0) {
    placeHolder = (
      <Center>
        <Title>No comments yet!</Title>
      </Center>
    );
  }

  return {
    data,
    placeHolder,
  };
};
