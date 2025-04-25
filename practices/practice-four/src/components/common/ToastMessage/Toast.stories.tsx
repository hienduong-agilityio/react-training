// Libraries
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
      action: 'closed'
    },
    children: {
      description: 'The content of the message.',
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
      control: { type: 'select', options: ['success', 'error'] }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    onClose: () => {},
    children: 'Your product is created',
    type: 'success',
    undoEnabled: false,
    timeoutDuration: 5000
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast component with default success message.'
      }
    }
  }
};

export const SetTimeOut: Story = {
  args: {
    onClose: () => {},
    children: 'Your product is created',
    timeoutDuration: 2000,
    type: 'success',
    undoEnabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast component with a shorter timeout duration.'
      }
    }
  }
};

export const ErrorMessage: Story = {
  args: {
    onClose: () => {},
    children: 'There was an issue with your request.',
    type: 'error',
    undoEnabled: false,
    timeoutDuration: 3000
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast component displaying an error message.'
      }
    }
  }
};

export const WithUndo: Story = {
  args: {
    onClose: () => {},
    children: 'Your changes have been reverted.',
    type: 'success',
    undoEnabled: true,
    timeoutDuration: 5000
  },
  parameters: {
    docs: {
      description: {
        story: 'Toast component with undo enabled.'
      }
    }
  }
};
