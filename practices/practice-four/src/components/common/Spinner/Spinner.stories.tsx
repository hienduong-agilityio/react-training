// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import Spinner from './index';

const meta = {
  title: 'Components/common/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Size of the spinner. Can be "small", "medium", or "large".',
      control: { type: 'select', options: ['small', 'medium', 'large'] }
    },
    color: {
      description: 'Color of the spinner. Default is "blue".',
      control: { type: 'color' }
    },
    customClasses: {
      description: 'Custom CSS classes to be applied to the spinner.',
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    customClasses: 'm-5'
  },
  render: (args) => <Spinner {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Default spinner with customizable color and size.'
      }
    }
  }
};

export const SmallSpinner: Story = {
  args: {
    size: 'small',
    customClasses: 'm-5'
  },
  render: (args) => <Spinner {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Small-sized spinner for compact areas.'
      }
    }
  }
};

export const MediumSpinner: Story = {
  args: {
    size: 'medium',
    customClasses: 'm-5'
  },
  render: (args) => <Spinner {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Medium-sized spinner for general usage.'
      }
    }
  }
};

export const LargeSpinner: Story = {
  args: {
    size: 'large',
    customClasses: 'm-5'
  },
  render: (args) => <Spinner {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Large-sized spinner for prominent display.'
      }
    }
  }
};

export const CustomColorSpinner: Story = {
  args: {
    color: 'text-red-500',
    customClasses: 'm-5'
  },
  render: (args) => <Spinner {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Spinner with customizable color.'
      }
    }
  }
};
