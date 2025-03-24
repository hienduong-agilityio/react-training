// Types
import type { Meta, StoryObj } from '@storybook/react';

// Component
import Tag from './index';

// Enum
import { COLORS } from '@/enums';

const meta = {
  title: 'Components/common/Tag',
  component: Tag,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      description:
        'Color of the Tag. Can be one of the COLORS enums: "default", "primary", "success", "warning", "danger".',
      control: { type: 'select', options: Object.values(COLORS) }
    },
    customClasses: {
      description: 'Custom CSS classes to be applied to the Tag.',
      control: { type: 'text' }
    },
    children: {
      description: 'Content inside the Tag.',
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TagDefault: Story = {
  args: {
    children: 'default',
    color: COLORS.DEFAULT
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Tag with the "default" color scheme. Suitable for displaying neutral or secondary information.'
      }
    }
  }
};

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tag {...args} children='Default' color={COLORS.DEFAULT} />
      <Tag {...args} children='Primary' color={COLORS.PRIMARY} />
      <Tag {...args} children='Success' color={COLORS.SUCCESS} />
      <Tag {...args} children='Warning' color={COLORS.WARNING} />
      <Tag {...args} children='Danger' color={COLORS.DANGER} />
    </div>
  ),
  args: {
    children: '',
    color: COLORS.DEFAULT
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays all available colors for the Tag component. Demonstrates different color variants: default, primary, success, warning, and danger.'
      }
    }
  }
};
