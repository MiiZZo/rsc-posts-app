import { createEvent } from 'effector';
import { SignUpForm } from 'features/sign-up';
import { GSSFactory } from 'shared/nextjs';
import { DefaultLayoutAnimation } from 'shared/ui/animations';

export default function SignUpPage() {
  return (
    <DefaultLayoutAnimation>
      <SignUpForm />
    </DefaultLayoutAnimation>
  );
}

export const { getServerSideProps } = GSSFactory({
  isProtectedRoute: false,
});
