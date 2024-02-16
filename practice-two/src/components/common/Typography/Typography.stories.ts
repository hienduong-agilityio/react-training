import type { Meta, StoryObj } from '@storybook/react';
import Text from './index';
import { TEXT_SIZE } from '@/constants/common';

const meta = {
  title: 'Components/common/Typography',
  component: Text,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    size: TEXT_SIZE.SMALL
  }
};

export const TextVariant: Story = {
  args: {
    children: 'Heading 1',
  },
};

export const LargeText: Story = {
  args: {
    children: 'LargeText',
    size: TEXT_SIZE.LARGE
  }
};

export const TextColor: Story = {
  args: {
    children: 'TextColor',
    customClasses: 'text-primary'
  }
};
