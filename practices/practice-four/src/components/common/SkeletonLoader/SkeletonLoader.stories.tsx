// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { SkeletonLoader } from './index';

const meta = {
  title: 'Components/common/SkeletonLoader',
  component: SkeletonLoader,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      description: 'Width of the skeleton loader',
      control: { type: 'text' },
      defaultValue: '100%'
    },
    height: {
      description: 'Height of the skeleton loader',
      control: { type: 'text' },
      defaultValue: '20px'
    },
    rounded: {
      description: 'Whether the skeleton loader has rounded corners',
      control: { type: 'boolean' },
      defaultValue: false
    },
    customClassName: {
      description: 'Custom CSS classes to be applied to the skeleton loader',
      control: { type: 'text' },
      defaultValue: ''
    }
  }
} satisfies Meta<typeof SkeletonLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '150px',
    height: '40px',
    rounded: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loader shaped like a button with rounded corners.'
      }
    }
  }
};
