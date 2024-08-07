// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import Dropdown from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/common/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownWithIconOnly: Story = {
  args: {
    options: ['Item 1', 'Item 2', 'Item 3'],
    onChange: (selectedOption) => console.log('Selected:', selectedOption)
  },
  render: (args) => <Dropdown {...args} />
};
