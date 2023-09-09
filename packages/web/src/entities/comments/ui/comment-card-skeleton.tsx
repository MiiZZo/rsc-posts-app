import { Box, Group, Skeleton, Stack, Text, rem } from '@mantine/core';
import { AvatarSkeleton } from 'shared/ui/avatar';

export function CommentCardSkeleton() {
  return (
    <Stack gap="xs">
      <Box>
        <Group gap="xs">
          <AvatarSkeleton size="xs" />
          <Text maw={rem(100)} component={Skeleton} fz="sm" c="dimmede">
            Loading
          </Text>
          <Text c="dimmed" fz="xs">
            Loading
          </Text>
        </Group>
      </Box>
      <Text component={Skeleton} miw={rem(300)} fz="sm">
      Loading
      </Text>
    </Stack>
  );
}
