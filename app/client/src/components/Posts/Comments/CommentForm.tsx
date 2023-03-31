import { ActionIcon, Box, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSend } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { createComment } from '@/services/comments';
import { Post } from '@/types/posts';
import { Comment } from '@/types/comments';

export const CommentForm = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: {
      body: '',
    },
  });

  async function handleSubmit(body: string) {
    const comment = await createComment({ postId, body });
    form.reset();

    queryClient.setQueryData(['posts'], (data?: Post[]) => {
      if (!data) return undefined;

      const targetPostIndex = data.findIndex((post) => post.id === postId);

      if (targetPostIndex !== -1) {
        const newData = [...data];
        const target = newData[targetPostIndex];

        newData[targetPostIndex] = {
          ...target,
          commentsCount: target.commentsCount + 1,
        };

        return newData;
      }
    });

    queryClient.setQueryData([`comments/${postId}`], (data?: Comment[]) => {
      if (!data) return undefined;

      const newData = [comment, ...data];

      return newData;
    });
  }

  return (
    <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values.body))}>
      <TextInput
        placeholder="write your comment"
        data-autofocus
        {...form.getInputProps('body')}
        rightSection={
          <ActionIcon type="submit">
            <IconSend />
          </ActionIcon>
        }
      />
    </Box>
  );
};
