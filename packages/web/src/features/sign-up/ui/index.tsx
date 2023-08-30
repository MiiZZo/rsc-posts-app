import {
  Container,
  Title,
  Text,
  Paper,
  Anchor,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  LoadingOverlay,
} from '@mantine/core';
import { reflect } from '@effector/reflect';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import * as model from '../model';

const EmailField = reflect({
  view: TextInput,
  bind: {
    value: model.signUpForm.fields.email.$value,
    error: model.signUpForm.fields.email.$errors.map((errors) => errors[0] || ''),
    disabled: model.signUpQuery.$isPending,
    onChange: model.signUpForm.fields.email.changed.prepend((e) => e.target.value),
  },
});

const PasswordField = reflect({
  view: PasswordInput,
  bind: {
    value: model.signUpForm.fields.password.$value,
    error: model.signUpForm.fields.password.$errors.map((errors) => errors[0] || ''),
    disabled: model.signUpQuery.$isPending,
    onChange: model.signUpForm.fields.password.changed.prepend((e) => e.target.value),
  },
});

const UsernameField = reflect({
  view: TextInput,
  bind: {
    value: model.signUpForm.fields.username.$value,
    error: model.signUpForm.fields.username.$errors.map((errors) => errors[0] || ''),
    disabled: model.signUpQuery.$isPending,
    onChange: model.signUpForm.fields.username.changed.prepend((e) => e.target.value),
  },
});

interface Props {
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function SignUpFormView({
  isSubmitting,
  children,
  onSubmit,
}: PropsWithChildren<Props>) {
  return (
    <Container pos="relative" size={420} my={40}>
      <LoadingOverlay
        visible={isSubmitting}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Title ta="center">Create your account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account ?{' '}
        <Anchor size="sm" component={Link} href="/sign-in">
          Sign in
        </Anchor>
      </Text>
      <form
        name="create-account"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack>{children}</Stack>
          <Button disabled={isSubmitting} type="submit" fullWidth mt="xl">
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
    children: (
      <>
        <EmailField label="Email" placeholder="you@mantine.dev" required />
        <UsernameField label="Username" placeholder="Your username" required />
        <PasswordField label="Password" placeholder="Your password" required />
      </>
    ),
    isSubmitting: model.$isFormSubmitting,
    onSubmit: model.signUpForm.submit,
  },
});
