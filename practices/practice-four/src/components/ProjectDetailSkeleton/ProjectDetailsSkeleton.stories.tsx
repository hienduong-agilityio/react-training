// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { ProjectDetailSkeleton } from '@/components';

const meta = {
  title: 'Components/ProjectDetailSkeleton',
  component: ProjectDetailSkeleton,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive'
    },
    backgrounds: {
      default: 'white'
    },
    docs: {
      inlineStories: false,
      iframeHeight: 600
    }
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof ProjectDetailSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loader layout used for loading states on the Project Detail page.'
      }
    },
    layout: 'fullscreen'
  }
};
