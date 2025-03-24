// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import Modal from '.';

const meta: Meta<typeof Modal> = {
  title: 'Components/common/Modal',
  component: Modal,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// Basic Modal Example
export const BasicModal: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    children: (
      <div className='bg-gray-100 space-y-4 rounded-xl'>
        <div className='p-4 md:p-5 space-y-4'>
          <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab maiores nobis delectus ullam iste non. Veniam
            architecto incidunt repudiandae! Molestias voluptatem sunt quas, dolorem non quasi culpa ipsa eligendi
            quibusdam vitae! Quia laudantium sequi ullam labore cum odio enim saepe magnam provident, culpa blanditiis
            tenetur. Vero est nam repellat dicta?
          </p>
        </div>
      </div>
    )
  },
  render: (args) => <Modal {...args} />
};
