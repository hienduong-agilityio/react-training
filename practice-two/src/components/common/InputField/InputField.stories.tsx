import type { Meta, StoryObj } from '@storybook/react';
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
    placeholder: 'Enter your pokename',
    type: 'number',
    onChange: (e) => {
      console.log(e.target.value);
    }
  }
};

export const Primary: Story = {
  args: {
    placeholder: 'Enter your pokename',
    customClasses: 'text-primary placeholder-primary pl-5 ',
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
    customClasses: 'cursor-not-allowed',
    onClick: () => {
      alert('Button component');
    }
  }
};
