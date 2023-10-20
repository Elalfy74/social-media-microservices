import { Stack } from '@mantine/core';
import { CommentItem } from './CommentItem';
import { useCommentList } from './useCommentList.hook';

export const CommentList = ({ postId }: { postId: string }) => {
  const { data, placeHolder } = useCommentList(postId);

  if (placeHolder) return placeHolder;

  return (
    <Stack mt={40}>
      {data!.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </Stack>
  );
};
