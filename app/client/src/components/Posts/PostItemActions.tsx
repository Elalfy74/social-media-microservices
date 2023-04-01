import { Group, ActionIcon, Button, Text, useMantineTheme, Modal } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconMessage2 } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '@/store';
import { useLike } from './useLike.hook';
import { type Post } from '@/types/posts.types';
// eslint-disable-next-line import/no-cycle
import { FullPostContent } from './FullPostContent';

export const PostItemActions = ({
  post,
  disableCommentBtn,
}: {
  post: Post;
  disableCommentBtn?: boolean;
}) => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  const currentUser = useAuth((state) => state.currentUser);

  const handleLike = useLike({ postId: post.id, userHasLiked: post.userHasLiked });

  return (
    <>
      <Modal
        zIndex={3000}
        size="lg"
        centered
        radius="md"
        title={`${post.username}'s Post`}
        styles={{
          title: {
            fontSize: '2rem',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          },
        }}
        withinPortal
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        opened={opened}
        onClose={close}
      >
        <FullPostContent post={post} />
      </Modal>

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
              {post.userHasLiked ? <IconHeartFilled /> : <IconHeart />}
            </ActionIcon>
            <Text>{post.likesCount}</Text>
          </Group>
          <Group align="center" spacing={4}>
            <ActionIcon
              variant="subtle"
              radius="xl"
              size="lg"
              color="blue"
              onClick={open}
              disabled={!currentUser || disableCommentBtn}
            >
              <IconMessage2 />
            </ActionIcon>
            <Text>{post.commentsCount}</Text>
          </Group>
        </Group>
        <Button>Comment</Button>
      </Group>
    </>
  );
};
