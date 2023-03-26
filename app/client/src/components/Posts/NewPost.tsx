import { createStyles, Modal, Paper, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NewPostContent } from './NewPostContent';

const useStyles = createStyles((theme) => ({
  newPost: {
    background: theme.colors.dark[6],
    maxWidth: '400px',
    marginBottom: '20px',
    cursor: 'pointer',
    transition: '0.2s',
    ':hover': {
      background: theme.colors.dark[4],
    },
  },
}));

export const NewPost = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        centered
        radius="md"
        withinPortal
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        opened={opened}
        onClose={close}
      >
        <NewPostContent />
      </Modal>
      <Paper mx="auto" radius="xl" p="sm" withBorder className={classes.newPost} onClick={open}>
        Create New Post Now!
      </Paper>
    </>
  );
};
