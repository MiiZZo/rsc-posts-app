import { Anchor, Group, Stack, Text, rem } from '@mantine/core';
import { PostComment } from 'common/types';
import Link from 'next/link';
import { paths } from 'shared/navigation';
import { Avatar } from 'shared/ui/avatar';

interface Props {
  comment: PostComment;
}

export function CommentCard({
  comment,
}: Props) {
  const {
    user,
  } = comment;

  return (
    <Stack gap="xs">
      <Anchor component={Link} href={paths.profiles({ username: user.username })}>
        <Group gap="xs">
          <Avatar username={user.username} size="xs" />
          <Text maw={rem(100)} fz="sm" c="dimmede">
            {user.username}
          </Text>
          <Text c="dimmed" fz="xs">
            {comment.createdAt}
          </Text>
        </Group>
      </Anchor>
      <Text miw={rem(300)} fz="sm">
        {comment.body}
      </Text>
    </Stack>
  );
}
