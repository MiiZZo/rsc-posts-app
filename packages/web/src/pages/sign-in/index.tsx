import { SignIn } from 'features/sign-in';
import { DefaultLayoutAnimation } from 'shared/ui/animations';

export default function SignInPage() {
  return (
    <DefaultLayoutAnimation>
      <SignIn />
    </DefaultLayoutAnimation>
  );
}
