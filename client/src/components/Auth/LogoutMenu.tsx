import { Menu, Text, Button } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import { useAuth } from '@/store';

export function LogoutMenu() {
  const { currentUser, signout } = useAuth();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="subtle"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {currentUser?.username} <IconChevronDown size="1rem" />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <Text onClick={signout}>Logout</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
