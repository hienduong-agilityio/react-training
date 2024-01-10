import type { Meta, StoryObj } from '@storybook/react';
import Message from './Message';

const meta = {
  title: 'Components/common/Message',
  component: Message,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {},
    title: 'Success',
    text: 'Your products is created',
  },
};

export const MessageNoCloseButton: Story = {
  args: {
    onClose: () => {},
    title: 'Success',
    text: 'Your products is created',
    closeButtonEnabled: false,
  },
};

export const SetTimeOut: Story = {
  args: {
    onClose: () => {},
    title: 'Success',
    text: 'Your products is created',
    timeoutDuration: 10000,
  },
};
