// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import Avatar from './index';

const meta = {
  title: 'Components/common/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AvatarLetter: Story = {
  args: {
    name: 'Jame Smith'
  }
};

export const CircleAvatar: Story = {
  args: {
    name: 'Hien Duong',
    customClass: 'rounded-full'
  }
};

export const AvatarImage: Story = {
  args: {
    name: 'Jame Smith',
    src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/222.jpg'
  }
};
