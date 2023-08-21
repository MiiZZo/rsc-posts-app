import { ToggleTheme } from './_toggle-theme';
import { GSSFactory } from 'shared/nextjs';

export default function Index() {
 return (
  <ToggleTheme />
 );
}

export const { getServerSideProps } = GSSFactory({
  isProtectedRoute: true,
});
