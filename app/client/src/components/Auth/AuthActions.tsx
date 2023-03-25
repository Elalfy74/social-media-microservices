import { useState } from 'react';

import { Modal, Button, Group, useMantineTheme } from '@mantine/core';

import { AuthContent } from './AuthContent';
import { ContentType } from './Content.type';

export function AuthActions() {
  const [content, setContent] = useState<ContentType>(null);
  const theme = useMantineTheme();

  function handleContent(contentValue: ContentType) {
    setContent(contentValue);
  }

  return (
    <>
      <Modal
        opened={!!content}
        onClose={() => handleContent(null)}
        centered
        radius="md"
        withinPortal
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <AuthContent content={content} handleContent={handleContent} />
      </Modal>

      <Group>
        <Button variant="default" onClick={() => handleContent('login')}>
          Log in
        </Button>
        <Button onClick={() => handleContent('signup')}>Sign up</Button>
      </Group>
    </>
  );
}
