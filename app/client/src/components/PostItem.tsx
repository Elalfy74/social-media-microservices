import { Card, Image, Text, Group, createStyles, Button, rem, Title } from '@mantine/core';
import { IconHeart, IconMessage2 } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    maxWidth: 600,
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

export function PostItem() {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.titleSection}>
        <Title order={3}>My First Image</Title>
      </Card.Section>
      <Card.Section className={classes.imageSection}>
        <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
      </Card.Section>

      <Group position="right" my="md" spacing={4}>
        <Text c="dimmed">By</Text>
        <Text fw={500}>Mahmoud Elalfy</Text>
      </Group>

      <Card.Section className={classes.section}>
        <Group spacing={30} position="apart">
          <Group>
            <Group align="center" spacing={4}>
              <IconHeart /> 2
            </Group>
            <Group align="center" spacing={4}>
              <IconMessage2 /> 3
            </Group>
          </Group>
          <Button>Comment</Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
