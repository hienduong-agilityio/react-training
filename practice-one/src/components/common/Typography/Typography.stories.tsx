import type { Meta, StoryObj } from '@storybook/react';
import Text from './Typography';
import { TEXT_VARIANT } from '../../../types/common';

const meta = {
  title: 'Typography',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: TEXT_VARIANT.NORMAL,
    className: ''
  },
};

export const LargeText: Story = {
  args: {
    children: 'LargeText',
    variant: TEXT_VARIANT.LARGE,
    className: ''

  },
};

export const TextColor: Story = {
  args: {
    children: 'TextColor',
    className: 'primary',
  },
};
