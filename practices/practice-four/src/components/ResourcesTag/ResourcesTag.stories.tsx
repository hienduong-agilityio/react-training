// Libraries
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { ResourceTag } from '@/components';

const meta: Meta<typeof ResourceTag> = {
  title: 'Components/ResourceTag',
  component: ResourceTag,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    resources: {
      description: 'The name of the resource associated with the project. It displays the resource tag.',
      control: { type: 'text' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ResourceTag>;

export const WithResources: Story = {
  args: {
    resources: 'Resource 1'
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays the resources associated with a project.'
      }
    }
  }
};

export const WithoutResources: Story = {
  args: {
    resources: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays an empty state for resources with a clickable tag.'
      }
    }
  }
};
