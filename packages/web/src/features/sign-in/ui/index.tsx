import { reflect } from '@effector/reflect';
import {
  Container,
  Title,
  Anchor,
  Paper,
  Stack,
  Text,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import Link from 'next/link';
import * as model from '../model';

export const UsernameField = reflect({
  view: TextInput,
  bind: {
    value: model.signInForm.fields.username.$value,
    onChange: (e) => model.signInForm.fields.username.changed(e.target.value),
  },
});

export const PasswordField = reflect({
  view: PasswordInput,
  bind: {
    value: model.signInForm.fields.password.$value,
    onChange: (e) => model.signInForm.fields.password.changed(e.target.value),
  },
});

interface Props {
  onSubmit: () => void;
}

export function SignInView({ onSubmit }: Props) {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component={Link} href="/sign-up">
          Create account
        </Anchor>
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack>
            <UsernameField
              label="Username"
              placeholder="Your username"
              required
            />
            <PasswordField
              label="Password"
              placeholder="Your password"
              required
            />
          </Stack>
          <Button type="submit" fullWidth mt="xl">
            Sign In
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export const SignIn = reflect({
  view: SignInView,
  bind: {
    onSubmit: model.signInForm.submit,
  },
});
