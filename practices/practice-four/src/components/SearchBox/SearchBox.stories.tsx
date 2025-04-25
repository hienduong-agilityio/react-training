// Libraries
import type { Meta, StoryObj } from '@storybook/react';

// Component
import SearchBox from '@/components/SearchBox';

const meta: Meta<typeof SearchBox> = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'The name attribute for the search input.'
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'The default value for the search input.'
    }
  }
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  args: {
    name: 'search',
    defaultValue: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'SearchBox component with an empty initial value.'
      }
    }
  }
};

export const WithValue: Story = {
  args: {
    name: 'search',
    defaultValue: 'Hello world'
  },
  parameters: {
    docs: {
      description: {
        story: 'SearchBox component with an initial value.'
      }
    }
  }
};
