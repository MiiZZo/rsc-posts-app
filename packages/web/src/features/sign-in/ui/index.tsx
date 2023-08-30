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
  LoadingOverlay,
} from '@mantine/core';
import Link from 'next/link';
import * as model from '../model';

export const UsernameField = reflect({
  view: TextInput,
  bind: {
    value: model.signInForm.fields.username.$value,
    onChange: model.signInForm.fields.username.changed.prepend((e) => e.target.value),
  },
});

export const PasswordField = reflect({
  view: PasswordInput,
  bind: {
    value: model.signInForm.fields.password.$value,
    onChange: model.signInForm.fields.password.changed.prepend((e) => e.target.value),
  },
});

interface Props {
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function SignInView({ 
  isSubmitting,
  onSubmit,
 }: Props) {
  return (
    <Container size={420} my={40} pos="relative">
      <LoadingOverlay 
        visible={isSubmitting}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
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
    isSubmitting: model.$isFormSubmitting,
    onSubmit: model.signInForm.submit,
  },
});
