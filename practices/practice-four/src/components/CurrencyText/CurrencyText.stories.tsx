// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { CurrencyText } from '@/components';

const meta: Meta<typeof CurrencyText> = {
  title: 'Components/CurrencyText',
  component: CurrencyText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    currency: {
      control: { type: 'number' },
      description: 'Optional estimated cost of the project, displayed as a financial estimate. Default value is 0.',
      defaultValue: 0
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for styling the paragraph element.',
      defaultValue: ''
    }
  }
};

export default meta;

type Story = StoryObj<typeof CurrencyText>;

export const Default: Story = {
  args: {
    currency: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays a default value of "-" when the currency is set to 0 or not provided.'
      }
    }
  }
};

export const WithCurrency: Story = {
  args: {
    currency: 100
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays the currency value as "US$ 100k" when a number is provided.'
      }
    }
  }
};

export const CustomClass: Story = {
  args: {
    currency: 250,
    className: 'font-bold text-xl'
  },
  parameters: {
    docs: {
      description: {
        story: 'Displays the currency value as "US$ 250k" with a custom CSS class applied to the paragraph element.'
      }
    }
  }
};
