// Libraries
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import { ErrorDisplay } from '@/components';

const meta: Meta<typeof ErrorDisplay> = {
  title: 'Components/common/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `The \`ErrorDisplay\` component is used to show error messages to the user. 
        It displays a message passed via the \`errorMessage\` prop and includes a button that 
        redirects the user to the home page. This component is essential for user feedback during 
        error scenarios in an application.`
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    errorMessage: {
      control: 'text',
      description: 'The error message to display when an error occurs.',
      defaultValue: 'An unexpected error has occurred.'
    }
  }
};

export default meta;

type Story = StoryObj<typeof ErrorDisplay>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter>
      <ErrorDisplay {...args} />
    </MemoryRouter>
  ),
  args: {
    errorMessage: 'An unexpected error has occurred.'
  }
};

export const CustomError: Story = {
  render: (args) => (
    <MemoryRouter>
      <ErrorDisplay {...args} />
    </MemoryRouter>
  ),
  args: {
    errorMessage: 'Failed to load data. Please try again later.'
  }
};
