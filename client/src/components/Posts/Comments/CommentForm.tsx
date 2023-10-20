import { ActionIcon, Box, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconSend } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { createComment } from '@/services/comments.service';
import { Post } from '@/types/posts.types';
import { Comment } from '@/types/comments.types';

const schema = z.object({
  body: z.string().min(2),
});

export const CommentForm = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      body: '',
    },
  });

  async function handleSubmit(body: string) {
    const comment = await createComment({ postId, body });
    form.reset();

    queryClient.setQueryData(['posts'], (data?: Post[]) => {
      if (!data) return;

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
      if (!data) return;

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
          <ActionIcon type="submit" disabled={!form.isValid()}>
            <IconSend />
          </ActionIcon>
        }
      />
    </Box>
  );
};
