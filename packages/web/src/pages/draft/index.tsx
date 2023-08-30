import { Container } from '@mantine/core';
import { CreatePost } from 'features/posts/create-post';
import { GSSFactory } from 'shared/nextjs';

export default function DraftPage() {
  return (
    <Container size="lg">
      <CreatePost />
    </Container>
  );
}

export const getServerSideProps = GSSFactory({
  isProtectedRoute: false,
});
