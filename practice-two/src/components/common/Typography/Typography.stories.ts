import type { Meta, StoryObj } from '@storybook/react';
import Typography, { TEXT_SIZE } from './index';

const meta = {
  title: 'Components/common/Typography',
  component: Typography,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    size: TEXT_SIZE.NORMAL
  }
};

export const TypographyTag: Story = {
  args: {
    children: 'Heading 1',
    tag: 'h1'
  }
};

export const TypographySize: Story = {
  args: {
    children: 'LargeText',
    size: TEXT_SIZE.LARGE
  }
};

export const TypographyColor: Story = {
  args: {
    children: 'TextColor',
    customClasses: 'text-primary'
  }
};
