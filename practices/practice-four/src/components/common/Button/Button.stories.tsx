// Types
import type { Meta, StoryObj } from '@storybook/react';

// Enums
import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS } from '@/enums';

// Component
import Button from './index';

const meta = {
  title: 'Components/common/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Variant of the button. Can be one of "text", "outline", "contained".',
      control: { type: 'select', options: Object.values(BUTTON_VARIANTS) }
    },
    size: {
      description: 'Size of the button. Can be one of "small", "medium", or "large".',
      control: { type: 'select', options: Object.values(BUTTON_SIZES) }
    },
    color: {
      description: 'Color of the button. Can be one of "primary", "default".',
      control: { type: 'select', options: Object.values(BUTTON_COLORS) }
    },
    customClasses: {
      description: 'Custom CSS classes to be applied to the button.',
      control: { type: 'text' }
    },
    onClick: {
      description: 'Function to handle button click event.',
      action: 'clicked'
    },
    children: {
      description: 'Content inside the button.',
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    customClasses: 'm-5'
  },

  render: (args) => (
    <>
      <Button {...args}>Default</Button>
      <Button disabled {...args}>
        Default
      </Button>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default button with optional disabled state.'
      }
    }
  }
};

export const ContainedVariant: Story = {
  args: {
    children: 'Button primary',
    type: 'button',
    variant: BUTTON_VARIANTS.CONTAINED,
    customClasses: 'm-5',

    onClick: () => {
      alert('Button component');
    }
  },

  render: (args) => (
    <>
      <Button color={BUTTON_COLORS.PRIMARY} {...args}>
        Primary
      </Button>
      <Button color={BUTTON_COLORS.DANGER} {...args}>
        Danger
      </Button>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with a "contained" variant, showcasing primary and danger colors.'
      }
    }
  }
};

export const OutlineVariant: Story = {
  args: {
    children: 'Button secondary',
    variant: BUTTON_VARIANTS.OUTLINED,
    onClick: () => {
      alert('Button component');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an "outlined" variant.'
      }
    }
  }
};

export const TextVariant: Story = {
  args: {
    children: 'Button text',
    variant: BUTTON_VARIANTS.TEXT,
    onClick: () => {
      alert('Button component');
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with a "text" variant.'
      }
    }
  }
};

export const TextWithIcon: Story = {
  args: {
    children: 'Text With Icon',
    variant: BUTTON_VARIANTS.CONTAINED,
    color: BUTTON_COLORS.PRIMARY,
    onClick: () => {
      alert('Button component');
    }
  },
  render: (args) => {
    return (
      <Button {...args}>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='#ffff'>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M7.99999 2C8.4142 2 8.74999 2.33579 8.74999 2.75V7.25H13.25C13.6642 7.25 14 7.58579 14 8C14 8.41422 13.6642 8.75 13.25 8.75H8.74999V13.25C8.74999 13.6642 8.4142 14 7.99999 14C7.58578 14 7.24999 13.6642 7.24999 13.25V8.75H2.75C2.33579 8.75 2 8.41422 2 8C2 7.58579 2.33579 7.25 2.75 7.25H7.24999V2.75C7.24999 2.33579 7.58578 2 7.99999 2Z'
            fill='#FFFFF'
          />
        </svg>
        Button
      </Button>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with text and an icon, using the "contained" variant and primary color.'
      }
    }
  }
};

export const ButtonWithDifferentSize: Story = {
  args: {
    variant: BUTTON_VARIANTS.TEXT,
    customClasses: 'inline-flex'
  },

  render: (args) => (
    <>
      <Button size={BUTTON_SIZES.SMALL} {...args}>
        Small
      </Button>
      <Button size={BUTTON_SIZES.MEDIUM} {...args}>
        Medium
      </Button>
      <Button size={BUTTON_SIZES.LARGE} {...args}>
        Large
      </Button>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button with different sizes: small, medium, and large.'
      }
    }
  }
};
