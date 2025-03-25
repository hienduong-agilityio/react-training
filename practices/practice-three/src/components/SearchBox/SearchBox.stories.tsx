// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import SearchBox from '.';

const meta = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof SearchBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    name: 'defaultSearch',
    onChange: (e) => {
      console.log(e.target.value);
    }
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search...',
    name: 'disabledSearch',
    disabled: true
  }
};
