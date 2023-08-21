import {
  Container,
  Title,
  Text,
  Paper,
  Anchor,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Stack,
} from '@mantine/core';
import { reflect } from '@effector/reflect';
import * as model from '../model';
import Link from 'next/link';

const EmailField = reflect({
  view: TextInput,
  bind: {
    value: model.signUpForm.fields.email.$value,
    error: model.signUpForm.fields.email.$errors.map((errors) => errors[0]),
    onChange: (e) => model.signUpForm.fields.email.changed(e.target.value),
  },
});

const PasswordField = reflect({
  view: PasswordInput,
  bind: {
    value: model.signUpForm.fields.password.$value,
    error: model.signUpForm.fields.password.$errors.map((errors) => errors[0]),
    onChange: (e) => model.signUpForm.fields.password.changed(e.target.value),
  },
});

const UsernameField = reflect({
  view: TextInput,
  bind: {
    value: model.signUpForm.fields.username.$value,
    error: model.signUpForm.fields.username.$errors.map((errors) => errors[0]),
    onChange: (e) => model.signUpForm.fields.username.changed(e.target.value),
  },
});

interface Props {
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function SignUpFormView({ onSubmit }: Props) {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Create your account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account ?{' '}
        <Anchor size="sm" component={Link} href="/sign-in">
          Sign in
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
            <EmailField label="Email" placeholder="you@mantine.dev" required />
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
            Create account
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export const SignUpForm = reflect({
  view: SignUpFormView,
  bind: {
    isSubmitting: model.signUpQuery.$isPending,
    onSubmit: model.signUpForm.submit,
  },
});
