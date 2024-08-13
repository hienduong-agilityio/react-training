// Libraries
import type { Meta, StoryObj } from '@storybook/react';

// Component
import ProjectModalForm from './index';

// Types
import type { IProjectItemProps } from '@/components/ProjectItem';

const meta: Meta<typeof ProjectModalForm> = {
  title: 'Components/ProjectModalForm',
  component: ProjectModalForm,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div className='h-[800px] w-[400px] p-4 md:p-10 flex justify-center items-start'>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ProjectModalForm>;

export const CreateProjectForm: Story = {
  args: {
    title: 'Create New Project',
    isOpen: true
  },

  render: (args) => <ProjectModalForm {...args} />
};

export const EditProjectForm: Story = {
  args: {
    title: 'Edit Project',
    isOpen: true
  },

  render: (args) => <ProjectModalForm {...args} />
};
