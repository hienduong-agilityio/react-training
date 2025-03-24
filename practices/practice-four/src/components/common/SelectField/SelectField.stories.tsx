import type { Meta, StoryObj } from '@storybook/react';
import SelectField from './index';

const meta: Meta<typeof SelectField> = {
  title: 'Components/common/SelectField',
  component: SelectField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label displayed above the select element.',
      control: { type: 'text' },
      defaultValue: ''
    },
    name: {
      description: 'The name attribute for the select element.',
      control: { type: 'text' }
    },
    errorMessage: {
      description: 'The error message to display if validation fails.',
      control: { type: 'text' },
      defaultValue: ''
    },
    defaultValue: {
      description: 'The default selected value of the select element.',
      control: { type: 'text' },
      defaultValue: ''
    },
    customClasses: {
      description: 'The custom CSS classes for styling the select element.',
      control: { type: 'text' },
      defaultValue: ''
    },
    children: {
      description: 'The elements to be rendered within the select dropdown.',
      control: { type: 'text' }
    },
    onChange: {
      description: 'Function to handle change events on the select element.',
      action: 'value changed'
    }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default story with no error message
export const Default: Story = {
  args: {
    label: 'Select an option',
    name: 'example',
    children: (
      <>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
        <option value='3'>Option 3</option>
      </>
    )
  }
};

// Story demonstrating an error message
export const WithErrorMessage: Story = {
  args: {
    label: 'Select an option',
    name: 'example',
    errorMessage: 'This field is required.',
    children: (
      <>
        <option value=''>Select an option...</option>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
        <option value='3'>Option 3</option>
      </>
    )
  }
};

// Story with a default value set
export const WithDefaultValue: Story = {
  args: {
    label: 'Select an option',
    name: 'example',
    defaultValue: '2',
    children: (
      <>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
        <option value='3'>Option 3</option>
      </>
    )
  }
};
