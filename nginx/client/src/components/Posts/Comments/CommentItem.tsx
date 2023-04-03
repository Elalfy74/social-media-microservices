import { Paper, Group, Text } from '@mantine/core';
import { type Comment } from '@/types/comments.types';

export const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <Paper withBorder radius="md" p={10} w="fit">
      <Group>
        <div>
          <Text size="sm">{comment.username}</Text>
          <Text size="xs" color="dimmed">
            {comment.createdAt.toString()}
          </Text>
        </div>
      </Group>
      <Text pt={8} size="sm">
        {comment.body}
      </Text>
    </Paper>
  );
};
