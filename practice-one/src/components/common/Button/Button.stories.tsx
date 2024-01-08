import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { BUTTON_VARIANT } from '../../../types/common';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button primary',
    variant: BUTTON_VARIANT.PRIMARY,
    className: 'outline',
    onClick: () => {
      alert('Button component');
    },
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button secondary',
    variant: BUTTON_VARIANT.SECONDARY,
    className: '',
    onClick: () => {
      alert('Button component');
    },
  },
};

export const Outline: Story = {
  args: {
    children: 'Button outline',
    variant: BUTTON_VARIANT.OUTLINE,
    className: '',
    onClick: () => {
      alert('Button component');
    },
  },
};
