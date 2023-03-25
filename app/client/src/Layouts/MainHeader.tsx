import { Header, Group, Button, Text, Container } from '@mantine/core';

export function MainHeader() {
  return (
    // <Box pb={120}>
    <Header height={60} fixed>
      <Container h="100%">
        <Group position="apart" sx={{ height: '100%' }}>
          <Text size={30} c="blue" fw="bold">
            MS
          </Text>
          <Group>
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </Group>
      </Container>
    </Header>
  );
}
