import { Header, Group, Text, Container } from '@mantine/core';
import { AuthActions, LogoutMenu } from '@/components/Auth';
import { useAuth } from '@/store';

export function MainHeader() {
  const currentUser = useAuth((state) => state.currentUser);

  return (
    <Header height={60} fixed>
      <Container h="100%">
        <Group position="apart" sx={{ height: '100%' }}>
          <Text size={30} c="blue" fw="bold">
            MS
          </Text>
          {!currentUser && <AuthActions />}
          {currentUser && <LogoutMenu />}
        </Group>
      </Container>
    </Header>
  );
}
