import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './index';

const meta: Meta<typeof Pagination> = {
  title: 'Components/common/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      description: 'The current active page number.',
      control: { type: 'number', min: 1 }
    },
    totalPages: {
      description: 'The total number of pages.',
      control: { type: 'number', min: 1 }
    },
    onPageChange: {
      description: 'Function to handle page change events.',
      action: 'page changed'
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log(`Page changed to: ${page}`)
  }
};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page) => console.log(`Page changed to: ${page}`)
  }
};

export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    onPageChange: (page) => console.log(`Page changed to: ${page}`)
  }
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log(`Page changed to: ${page}`)
  }
};
