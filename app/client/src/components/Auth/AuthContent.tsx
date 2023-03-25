import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { ContentType } from './Content.type';

type AuthContentProps = {
  content: ContentType;
  handleContent: (content: ContentType) => void;
};

export function AuthContent({ content, handleContent }: AuthContentProps) {
  const isLogin = content === 'login';

  return (
    <Container size={420} py={30}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        {isLogin ? 'Welcome back!' : 'Register Now!'}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {isLogin ? 'Do not have an account yet?' : 'Already have an account?'}{' '}
        <Anchor
          size="sm"
          component="button"
          onClick={isLogin ? () => handleContent('signup') : () => handleContent('login')}
        >
          {isLogin ? 'Create account' : 'Login'}
        </Anchor>
      </Text>

      <Paper shadow="md" mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          {isLogin ? 'Login' : 'Signup'}
        </Button>
      </Paper>
    </Container>
  );
}
