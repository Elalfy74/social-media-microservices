import { createStyles, Paper } from '@mantine/core';

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

  return (
    <Paper mx="auto" radius="xl" p="sm" withBorder className={classes.newPost}>
      Create New Post Now!
    </Paper>
  );
};
