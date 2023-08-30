import {
  Title,
  Text,
  Button,
  Container,
  rem,
  Center,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { paths } from 'shared/navigation';

export default function NotFoundPage() {
  const { colors } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Head>
        <title>Post it! | Not Found</title>
      </Head>
      <Container py={rem(80)}>
        <Title
          c={colorScheme === 'dark' ? colors.dark[4] : colors.gray[2]}
          ta="center"
          fz={rem(220)}
          fw={900}
          mb="xl"
          lh={1}
          order={1}
        >
          404
        </Title>
        <Title ta="center" fw={900} fz={rem(38)}>
          You have found a secret place.
        </Title>
        <Text maw={rem(500)} mx="auto" my="xl" c="dimmed" size="lg" ta="center">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Center>
          <Button
            component={Link}
            href={paths.home()}
            variant="subtle"
            size="md"
          >
            Take me back to home page
          </Button>
        </Center>
      </Container>
    </>
  );
}
