// Libraries
import type { Meta, StoryObj } from '@storybook/react';

// Component
import ProjectUpdateForm from './ProjectUpdateForm';

const meta: Meta<typeof ProjectUpdateForm> = {
  title: 'Components/ProjectModalForm/ProjectUpdateForm',
  component: ProjectUpdateForm,
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

type Story = StoryObj<typeof ProjectUpdateForm>;

export const CreateProjectForm: Story = {
  args: {
    title: 'Create New Project',
    isOpen: true
  },

  render: (args) => <ProjectUpdateForm {...args} />
};

export const EditProjectForm: Story = {
  args: {
    title: 'Edit Project',
    isOpen: true
  },

  render: (args) => <ProjectUpdateForm {...args} />
};
