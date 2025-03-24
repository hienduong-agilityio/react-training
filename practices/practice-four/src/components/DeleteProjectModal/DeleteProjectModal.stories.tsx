// Libraries
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Component
import { DeleteProjectModal } from '@/components';

// Create a QueryClient for React Query
const queryClient = new QueryClient();

const meta: Meta<typeof DeleteProjectModal> = {
  title: 'Components/DeleteProjectModal',
  component: DeleteProjectModal,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className='h-[800px] w-[400px] p-4 md:p-10 flex justify-center items-start'>
          <Story />
        </div>
      </QueryClientProvider>
    )
  ],
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof DeleteProjectModal>;

export const DeleteForm: Story = {
  args: {
    isModalOpen: true,
    projectId: '1'
  },
  render: (args) => <DeleteProjectModal {...args} />
};
