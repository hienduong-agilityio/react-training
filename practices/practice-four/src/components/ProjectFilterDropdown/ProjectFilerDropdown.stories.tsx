// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { ProjectFilterDropdown } from '@/components';

// Mock options for the dropdown
const mockOptions = [
  { label: 'All Projects', value: 'all' },
  { label: 'Ongoing Projects', value: 'ongoing' },
  { label: 'Completed Projects', value: 'completed' }
];

const meta: Meta<typeof ProjectFilterDropdown> = {
  title: 'Components/ProjectFilterDropdown',
  component: ProjectFilterDropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    searchField: {
      control: { type: 'text' },
      description: 'The field used for searching and controlling the selected value of the dropdown.',
      defaultValue: ''
    },
    options: {
      control: { type: 'object' },
      description: 'Array of option objects to display in the dropdown menu.',
      defaultValue: mockOptions
    },
    onChange: {
      action: 'changed',
      description: 'Callback function to be called when an option is selected.'
    }
  }
};

export default meta;

type Story = StoryObj<typeof ProjectFilterDropdown>;

export const Default: Story = {
  args: {
    searchField: '',
    options: mockOptions
  },
  parameters: {
    docs: {
      description: {
        story: 'Default dropdown with the provided options. No option is selected initially.'
      }
    }
  }
};

export const SelectedValue: Story = {
  args: {
    searchField: 'ongoing',
    options: mockOptions
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays the dropdown with the "Ongoing Projects" option pre-selected.'
      }
    }
  }
};
