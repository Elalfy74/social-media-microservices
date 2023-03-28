import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Loader,
  Alert,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { IconAlertCircle } from '@tabler/icons-react';
import { AxiosError } from 'axios';
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
  const isLoginView = content === 'login';

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (authInput: AuthInput) => {
      if (isLoginView) {
        return login(authInput);
      }
      return signup(authInput);
    },
    onSuccess: () => handleContent(null),
  });

  const form = useForm({
    validate: zodResolver(schema),
    validateInputOnBlur: true,
    initialValues: {
      username: '',
      password: '',
    },
  });

  const errMessage =
    error instanceof AxiosError ? error.response?.data.message : 'Something went wrong!';

  return (
    <Container size={420} py={30}>
      {isError && (
        <Alert icon={<IconAlertCircle size="1rem" />} color="red" mb={4}>
          {errMessage}
        </Alert>
      )}
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
        onSubmit={form.onSubmit((values) => mutate(values))}
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
          {isLoading ? <Loader variant="dots" color="white" /> : isLoginView ? 'Login' : 'Signup'}
        </Button>
      </Paper>
    </Container>
  );
}
