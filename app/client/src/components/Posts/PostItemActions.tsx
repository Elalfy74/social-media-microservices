import { Group, ActionIcon, Button, Text } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconMessage2 } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { createLike, removeLike } from '@/services/likes';
import { useAuth } from '@/store';

type PostItemActionsProps = {
  postId: string;
  likesCount: number;
  commentsCount: number;
  userHasLiked: boolean;
};

export const PostItemActions = (props: PostItemActionsProps) => {
  const queryClient = useQueryClient();
  const currentUser = useAuth((state) => state.currentUser);

  async function handleLike() {
    if (props.userHasLiked) {
      await removeLike({ postId: props.postId });
    } else {
      await createLike({ postId: props.postId });
    }
    queryClient.invalidateQueries({
      queryKey: ['posts'],
    });
  }

  return (
    <Group spacing={30} position="apart">
      <Group>
        <Group align="center" spacing={4}>
          <ActionIcon
            variant="subtle"
            radius="xl"
            size="lg"
            color="red"
            onClick={handleLike}
            disabled={!currentUser}
          >
            {props.userHasLiked ? <IconHeartFilled /> : <IconHeart />}
          </ActionIcon>
          <Text>{props.likesCount}</Text>
        </Group>
        <Group align="center" spacing={4}>
          <ActionIcon variant="subtle" radius="xl" size="lg" color="blue" disabled={!currentUser}>
            <IconMessage2 />
          </ActionIcon>
          <Text>{props.commentsCount}</Text>
        </Group>
      </Group>
      <Button>Comment</Button>
    </Group>
  );
};
