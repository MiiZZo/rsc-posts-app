import { Button, Container, Divider, Group } from '@mantine/core';

export async function Header() {
  return (
    <>
      <Container fluid>
        <Group style={{ height: 64 }} >
          <Button size="xs">Sign Up</Button>
        </Group>
      </Container>
      <Divider />
    </>
  );
}
