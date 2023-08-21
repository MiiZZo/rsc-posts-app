import { createEffect } from 'effector';
import { notifications, NotificationData } from '@mantine/notifications';

export const notifyFx = createEffect((notification: NotificationData) => {
  notifications.show(notification);
});
