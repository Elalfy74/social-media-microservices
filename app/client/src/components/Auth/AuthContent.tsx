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
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useAuth } from '@/store';
import { ContentType } from './Content.type';
import { AuthInput } from '@/types';

const schema = z.object({
  username: z.string().min(4, { message: 'Username should have at least 4 letters' }),
  password: z.string().min(4, { message: 'Password should have at least 4 letters' }),
});

type AuthContentProps = {
  content: ContentType;
  handleContent: (content: ContentType) => void;
};

export function AuthContent({ content, handleContent }: AuthContentProps) {
  const { login, signup } = useAuth();

  const form = useForm({
    validate: zodResolver(schema),
    validateInputOnBlur: true,
    initialValues: {
      username: '',
      password: '',
    },
  });

  const isLoginView = content === 'login';

  async function handleAuth(authInput: AuthInput) {
    if (isLoginView) {
      await login(authInput);
    } else {
      await signup(authInput);
    }

    handleContent(null);
  }

  return (
    <Container size={420} py={30}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        {isLoginView ? 'Welcome back!' : 'Register Now!'}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {isLoginView ? 'Do not have an account yet?' : 'Already have an account?'}{' '}
        <Anchor
          size="sm"
          component="button"
          onClick={isLoginView ? () => handleContent('signup') : () => handleContent('login')}
        >
          {isLoginView ? 'Create account' : 'Login'}
        </Anchor>
      </Text>

      <Paper
        shadow="md"
        mt={30}
        radius="md"
        component="form"
        onSubmit={form.onSubmit((values) => handleAuth(values))}
      >
        <TextInput
          autoComplete="username"
          label="Username"
          placeholder="Username"
          withAsterisk
          {...form.getInputProps('username')}
        />

        <PasswordInput
          autoComplete="current-password"
          label="Password"
          placeholder="Your password"
          withAsterisk
          mt="md"
          {...form.getInputProps('password')}
        />
        <Button fullWidth mt="xl" type="submit">
          {isLoginView ? 'Login' : 'Signup'}
        </Button>
      </Paper>
    </Container>
  );
}
