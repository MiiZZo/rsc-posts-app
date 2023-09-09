import {
  Center,
  MantineSize,
  Skeleton,
  Text,
} from '@mantine/core';
import cs from 'classnames';
import classes from './index.module.scss';

interface Props {
  size?: MantineSize;
}

export function AvatarSkeleton({ size = 'md', }: Props) {
  return (
    <Center component={Skeleton} className={cs(classes.avatar, classes[`avatar_size-${size}`])}>
      <Text className={cs(classes.avatar__text, classes[`avatar__text_size-${size}`])}>
        
      </Text>
    </Center>
  );
}
