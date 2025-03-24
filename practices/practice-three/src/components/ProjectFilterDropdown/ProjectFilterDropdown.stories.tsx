// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import ProjectFilterDropdown from './index';

const meta: Meta<typeof ProjectFilterDropdown> = {
  title: 'Components/ProjectFilterDropdown',
  component: ProjectFilterDropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ProjectFilterDropdownWithIconOnly: Story = {
  args: {
    options: ['Item 1', 'Item 2', 'Item 3'],
    onChange: (selectedOption) => console.log('Selected:', selectedOption)
  },
  render: (args) => <ProjectFilterDropdown {...args} />
};
