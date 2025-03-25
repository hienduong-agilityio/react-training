// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import ProjectOptionsDropdown from './index';

const meta: Meta<typeof ProjectOptionsDropdown> = {
  title: 'Components/ProjectOptionsDropdown',
  component: ProjectOptionsDropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ProjectOptionsDropdown>;

export const ProjectOptionsDropdownDefault: Story = {
  render: () => (
    <ProjectOptionsDropdown
      projectId={''}
      onOpenEdit={function (): void {
        throw new Error('Function not implemented.');
      }}
      onDelete={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  )
};
