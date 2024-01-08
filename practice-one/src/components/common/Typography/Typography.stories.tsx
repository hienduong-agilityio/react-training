import type { Meta, StoryObj } from '@storybook/react';
import Text from './Typography';
import { TEXT_SIZE } from '../../../types/common';

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
    size: TEXT_SIZE.NORMAL,
    className: ''
  },
};

export const LargeText: Story = {
  args: {
    children: 'LargeText',
    size: TEXT_SIZE.LARGE,
    className: '  '

  },
};

export const TextColor: Story = {
  args: {
    children: 'TextColor',
    className: 'primary',
  },
};
