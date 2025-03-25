import type { Meta, StoryObj } from '@storybook/react';
import Toast from '.';

const meta: Meta<typeof Toast> = {
  title: 'Components/common/Toast',
  component: Toast,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: {
      description: 'Function to call when the message is closed.',
      action: 'closed' // Use 'action' to log function calls
    },
    children: {
      description: 'The content of the message.',
      control: { type: 'text' }
    },
    title: {
      description: 'The title of the message.',
      control: { type: 'text' }
    },
    undoEnabled: {
      description: 'Whether the undo option is enabled.',
      control: { type: 'boolean' }
    },
    timeoutDuration: {
      description: 'Duration before the message automatically closes (in milliseconds).',
      control: { type: 'number' }
    },
    type: {
      description: 'Specifies the type of message, either success or error.',
      control: { type: 'select', options: ['success', 'error'] } // Added type control
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {},
    title: 'Success',
    children: 'Your product is created',
    type: 'success'
  }
};

export const SetTimeOut: Story = {
  args: {
    onClose: () => {},
    title: 'Success',
    children: 'Your product is created',
    timeoutDuration: 2000,
    type: 'success'
  }
};

export const ErrorMessage: Story = {
  args: {
    onClose: () => {},
    title: 'Error',
    children: 'There was an issue with your request.',
    type: 'error',
    undoEnabled: false,
    timeoutDuration: 3000
  }
};
