import type { Meta, StoryObj } from '@storybook/react';

import Text from './Typography';

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
    fontSize: 'medium',
    fontWeight: 'normal',
    color: 'defalut',
  },
};

export const SmallText: Story = {
  args: {
    children: 'SmallText',
    fontSize: 'small',
    fontWeight: 'normal',
    color: 'primary',
  },
};

export const LargeText: Story = {
  args: {
    children: 'LargeText',
    fontSize: 'large',
    fontWeight: 'bold',
    color: 'default',
  },
};
