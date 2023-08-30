import { SignIn } from 'features/sign-in';
import { GSSFactory } from 'shared/nextjs';
import { DefaultLayoutAnimation } from 'shared/ui/animations';

export default function SignInPage() {
  return (
    <DefaultLayoutAnimation>
      <SignIn />
    </DefaultLayoutAnimation>
  );
}

export const getServerSideProps = GSSFactory({
  isProtectedRoute: false,
});
