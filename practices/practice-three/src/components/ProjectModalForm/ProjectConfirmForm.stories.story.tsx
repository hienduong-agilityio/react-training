// Libraries
import type { Meta, StoryObj } from '@storybook/react';

// Component
import ProjectConfirmForm from './ProjectConfirmForm';

const meta: Meta<typeof ProjectConfirmForm> = {
  title: 'Components/ProjectModalForm/ProjectConfirmForm',
  component: ProjectConfirmForm,
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

type Story = StoryObj<typeof ProjectConfirmForm>;

export const DeleteForm: Story = {
  args: {
    isOpen: true
  },

  render: (args) => <ProjectConfirmForm {...args} />
};
