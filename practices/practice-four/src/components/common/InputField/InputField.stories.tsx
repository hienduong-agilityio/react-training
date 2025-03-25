// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import InputField from './index';

const meta = {
  title: 'Components/common/InputField',
  component: InputField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text',
    name: 'test',
    value: 50,
    type: 'number',
    customClasses: 'h-10',
    onChange: (e) => {
      console.log(e.target.value);
    }
  }
};

export const Primary: Story = {
  args: {
    placeholder: 'Enter your text',
    customClasses: 'text-primary placeholder-primary pl-5 h-10',
    type: 'text',
    onChange: (e) => {
      console.log(e.target.value);
    }
  }
};

export const Disable: Story = {
  args: {
    placeholder: 'disable',
    disabled: true,
    customClasses: 'cursor-not-allowed h-10',
    onClick: () => {
      alert('Button component');
    }
  }
};

export const ShowError: Story = {
  args: {
    placeholder: 'Enter your text',
    name: 'test',
    value: '',
    type: 'text',
    errorMessage: 'This field is required',
    onChange: (e) => {
      console.log(e.target.value);
    }
  }
};
