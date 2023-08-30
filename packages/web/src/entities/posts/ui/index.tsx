import { Card, Title, Text, Group, Flex } from '@mantine/core';
import Link from 'next/link';
import { Post } from 'common/types';
import { Avatar } from 'shared/ui/avatar';
import { paths } from 'shared/navigation';

interface Props {
  post: Post;
}

export function PostPreview({
  post,
}: Props) {
  return (
    <Card
      component={Link}
      href={paths.posts({ id: post.id })}
      shadow="xs"
      key={post.id}
    >
      <Title order={4}>{post.title}</Title>
      <Text fz="xs" c="dimmed">
        {post.createdAt}
      </Text>
      <Flex>
        <Group mt="xs" gap="xs">
          <Avatar size="xs" username={post.user.username} />
          <Text fz="sm" c="dimmed">
            {post.user.username}
          </Text>
        </Group>
      </Flex>
    </Card>
  );
}
