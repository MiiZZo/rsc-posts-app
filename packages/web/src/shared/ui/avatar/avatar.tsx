import {
  Center,
  MantineSize,
  Skeleton,
  Text,
} from '@mantine/core';
import cs from 'classnames';
import classes from './index.module.scss';

interface Props {
  username: string;
  size?: MantineSize;
}

export function Avatar({ username, size = 'md', }: Props) {
  return (
    <Center className={cs(classes.avatar, classes[`avatar_size-${size}`])}>
      <Text className={cs(classes.avatar__text, classes[`avatar__text_size-${size}`])}>
        {username && username[0]}
      </Text>
    </Center>
  );
}
