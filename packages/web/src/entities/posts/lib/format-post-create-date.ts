import { dayjs } from 'shared/dates';

export function formatPostCreateDate(date: string) {
  const createdAt = dayjs(date);
  const diffInMonths = dayjs().diff(createdAt, 'weeks');

  if (diffInMonths > 2) {
    return createdAt.format('DD/MM/YYYY');
  }

  return createdAt.fromNow(); 
}
