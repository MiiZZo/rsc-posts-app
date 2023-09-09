import { dayjs } from 'shared/dates';

export function formatCommentCreateDate(date: string) {
  console.log(date)
  const createdAt = dayjs(date);
  console.log(createdAt, createdAt.format('DD/MM/YYYY'))
  const diffInMonths = dayjs().diff(createdAt, 'weeks');

  if (diffInMonths > 2) {
    return createdAt.format('DD/MM/YYYY');
  }

  return createdAt.fromNow(); 
}
