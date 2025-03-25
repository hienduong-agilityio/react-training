// Libraries
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { SearchBox } from '@/components';

const meta: Meta<typeof SearchBox> = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The value for the search box.'
    }
  }
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  args: {
    value: ''
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
    value: 'Hello world'
  },
  parameters: {
    docs: {
      description: {
        story: 'SearchBox component with an initial value.'
      }
    }
  }
};
