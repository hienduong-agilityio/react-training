// Libraries
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { Timeline } from '@/components';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    timeStart: {
      description: 'The start time of the timeline in YYYY-MM-DD format.',
      control: { type: 'text' }
    },
    timeEnd: {
      description: 'The end time of the timeline in YYYY-MM-DD format.',
      control: { type: 'text' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  args: {
    timeStart: '2024-01-01',
    timeEnd: '2024-12-31'
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with both start and end times specified.'
      }
    }
  }
};

export const WithoutStartTime: Story = {
  args: {
    timeStart: '',
    timeEnd: '2024-12-31'
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with only the end time specified.'
      }
    }
  }
};

export const WithoutEndTime: Story = {
  args: {
    timeStart: '2024-01-01',
    timeEnd: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with only the start time specified.'
      }
    }
  }
};

export const WithoutBothTimes: Story = {
  args: {
    timeStart: '',
    timeEnd: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Timeline with no start or end times specified.'
      }
    }
  }
};
