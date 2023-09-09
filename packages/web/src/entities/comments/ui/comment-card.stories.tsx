import type { Meta, StoryObj } from '@storybook/react';
import { dayjs } from 'shared/dates';

import { CommentCard } from './';

const meta: Meta<typeof CommentCard> = {
  component: CommentCard,
};

export default meta;

type Story = StoryObj<typeof CommentCard>;

export const Default: Story = {
  args: {
    comment: {
      body: `
        Some comment here!
        Your post is awesome!
      `,
      createdAt: dayjs().format('DD/MM/YYYY'),
      user: {
        username: 'John'
      },
    }
  },
  render: CommentCard
};
