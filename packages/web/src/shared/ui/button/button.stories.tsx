import type { Meta, StoryObj } from '@storybook/react';
import { FaArrowUp } from 'react-icons/fa';

import { Button as ButtonView } from './button';

const meta: Meta<typeof ButtonView> = {
  title: 'Button',
  component: ButtonView,
  args: {
    children: 'Button',
    size: 'md',
    visual: 'solid',
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md'],
      control: {
        type: 'radio',
      }
    },
    visual: {
      options: ['solid', 'outline'],
      control: {
        type: 'radio',
      }
    },
    leftIcon: {
      defaultValue: false,
      control: {
        type: 'boolean',
      }
    },
    rightIcon: {
      defaultValue: false,
      control: {
        type: 'boolean',
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof ButtonView>;

export const Button: Story = {
  render: ({ leftIcon, rightIcon, ...rest }) => {
    return (
      <ButtonView
        leftIcon={leftIcon && <FaArrowUp />}
        rightIcon={rightIcon && <FaArrowUp />}
        {...rest}
      />
    );
  },
}
