import { Card, Image, Text, Group, createStyles, rem, Title } from '@mantine/core';
import { type Post } from '@/types/posts.types';
// eslint-disable-next-line import/no-cycle
import { PostItemActions } from './PostItemActions';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    maxWidth: 600,
    width: '100%',
  },

  titleSection: {
    padding: theme.spacing.md,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function PostItem({ post, disableCommentBtn }: { post: Post; disableCommentBtn?: boolean }) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.titleSection}>
        <Title order={3}>{post.title}</Title>
      </Card.Section>
      <Card.Section className={classes.imageSection}>
        <Image
          src={post.imageUrl}
          alt="Tesla Model S"
          fit="cover"
          height={400}
          radius="md"
          withPlaceholder
        />
      </Card.Section>

      <Group position="right" my="md" spacing={4}>
        <Text c="dimmed">By</Text>
        <Text fw={500}>{post.username}</Text>
      </Group>

      <Card.Section className={classes.section}>
        <PostItemActions post={post} disableCommentBtn={disableCommentBtn} />
      </Card.Section>
    </Card>
  );
}
