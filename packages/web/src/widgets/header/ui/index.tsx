import { rem, Flex, Button, Group, Anchor } from '@mantine/core';
import Link from 'next/link';
import { paths } from 'shared/navigation';

export function Header() {
  return (
    <Flex
      justify="space-between"
      px={rem(15)}
      p={rem(10)}
      h="inherit"
      align="center"
    >
      <Flex align="center">
        <Anchor component={Link} href={paths.feed({ page: 1 })}>
          Posts
        </Anchor>
      </Flex>
      <Group gap="xs">
        <Button
          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          variant="gradient"
          size="xs"
          component={Link}
          href={paths.signIn()}
        >
          Sign In
        </Button>
        <Button
          size="xs"
          variant="outline"
          component={Link}
          href={paths.signUp()}
        >
          Sign Up
        </Button>
      </Group>
    </Flex>
  );
}
